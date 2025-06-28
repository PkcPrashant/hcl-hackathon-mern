import { Request, Response, NextFunction } from "express";
import { successMiddleware } from "../middlewares/success.middleware";
import { OrderService } from "../services/OrderService";

class OrdersController {
  private orderService = new OrderService();

  async test(_req: Request, res: Response, next: NextFunction) {
    try {
      await this.orderService.createOrder(
        {
          items: [
            {
              productId: "12345",
              quantity: 2,
            },
            {
              productId: "67890",
              quantity: 1,
            },
          ],
          customerId: "dummy",
        }
      );
      successMiddleware("ok", true, res);
    } catch (err) {
      next(err);
    }
  }
}

export const ordersController = new OrdersController();
