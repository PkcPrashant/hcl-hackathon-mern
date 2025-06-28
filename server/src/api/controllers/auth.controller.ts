// src/controllers/auth.controller.ts

import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { successMiddleware } from '../middlewares/success.middleware';
import UserDetail from '../../models/User.model';
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '1d') as SignOptions['expiresIn'];

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { emailAddress, password } = req.body;

      if (!emailAddress || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const user = await UserDetail.findOne({ emailAddress });
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign(
        { id: user._id, emailAddress: user.emailAddress },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );
      successMiddleware({ message: 'Login successful', token, user }, true, res);
    } catch (err) {
      next(err);
    }
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        firstName,
        lastName,
        emailAddress,
        password,
        createdBy,
        modifiedBy,
      } = req.body;
      console.log('[DEBUG] signup body:', req.body);

      if (!firstName || !lastName || !emailAddress || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const existingUser = await UserDetail.findOne({ emailAddress });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }

      const user = await UserDetail.create({
        firstName,
        lastName,
        emailAddress,
        password,
        createdBy,
        modifiedBy,
      });

      successMiddleware({ message: 'Signup successful', user }, true, res, 201);
    } catch (err) {
      next(err);
    }
  }
}

export const authController = new AuthController();
