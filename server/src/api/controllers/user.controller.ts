import { Request, Response, NextFunction } from 'express';
import { successMiddleware } from '../middlewares/success.middleware';
import UserSchema from '../../models/User.model';

class UserController {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserSchema.find();
      successMiddleware(users, true, res);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserSchema.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      successMiddleware(user, true, res);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        firstName,
        lastName,
        emailAddress,
        createdOn,
        createdBy,
        modifiedOn,
        modifiedBy,
      } = req.body;
      const user = await UserSchema.create({
        firstName,
        lastName,
        emailAddress,
        createdOn,
        createdBy,
        modifiedOn,
        modifiedBy
      });
      successMiddleware(user, true, res, 201);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const updatedUser = await UserSchema.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true }
      );
      if (!updatedUser) return res.status(404).json({ message: 'User not found' });
      successMiddleware(updatedUser, true, res);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedUser = await UserSchema.findByIdAndDelete(req.params.id);
      if (!deletedUser) return res.status(404).json({ message: 'User not found' });
      successMiddleware({ message: 'User deleted' }, true, res);
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
