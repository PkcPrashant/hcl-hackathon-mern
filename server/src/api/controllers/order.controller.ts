import OrderDetail from '../../models/OrderDetail.model';
import { Request, Response, NextFunction } from 'express';
import { successMiddleware } from '../middlewares/success.middleware';

class OrderController {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await OrderDetail.find();
      successMiddleware(orders, true, res);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await OrderDetail.findById(req.params.id);
      if (!order) return res.status(404).json({ message: 'order not found' });
      successMiddleware(order, true, res);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderName, orderType, idOrderLoginDetail } = req.body;

      const order = await OrderDetail.create({
        orderName,
        orderType,
        createdOn: new Date(),
        idOrderLoginDetail,
      });
      successMiddleware(order, true, res, 201);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { orderName, orderType } = req.body;

      const updatedOrder = await OrderDetail.findByIdAndUpdate(
        id,
        {
          orderName,
          orderType,
          modifiedOn: new Date(),
        },
        { new: true, runValidators: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({ success: false, message: 'OrderDetail not found' });
      }

      successMiddleware(updatedOrder, true, res, 200);
    } catch (err) {
      next(err);
    }
  }
}

export const orderController = new OrderController();
