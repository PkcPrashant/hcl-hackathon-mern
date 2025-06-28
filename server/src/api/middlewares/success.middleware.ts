import { Response } from "express";

export function successMiddleware(
  data: any,
  status: boolean,
  res: Response,
  statusCode = 200
) {
  return res.status(statusCode).json({ data, status });
}
