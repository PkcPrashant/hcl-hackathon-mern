import { Request, Response, NextFunction } from "express";
import { successMiddleware } from "../middlewares/success.middleware";
import { prisma } from "../../database/client";

class UserController {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await prisma.user.findMany();
      successMiddleware(users, true, res);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);

      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) return res.status(404).json({ message: "User not found" });

      successMiddleware(user, true, res);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;

      const user = await prisma.user.create({
        data: { name },
      });

      successMiddleware(user, true, res, 201);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const { name } = req.body;

      const existingUser = await prisma.user.findUnique({ where: { id } });
      if (!existingUser)
        return res.status(404).json({ message: "User not found" });

      const updatedUser = await prisma.user.update({
        where: { id },
        data: { name },
      });

      successMiddleware(updatedUser, true, res);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);

      const existingUser = await prisma.user.findUnique({ where: { id } });
      if (!existingUser)
        return res.status(404).json({ message: "User not found" });

      await prisma.user.delete({ where: { id } });

      successMiddleware({ message: "User deleted" }, true, res);
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
