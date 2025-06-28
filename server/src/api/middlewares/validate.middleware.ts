import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

export const validate =
  (schema: AnyZodObject, property: "body" | "params" | "query" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = schema.parse(req[property]);
      req[property] = data;
      next();
    } catch (err) {
      if (err instanceof Error && "errors" in err) {
        return res.status(400).json({ errors: (err as any).errors });
      }
      next(err);
    }
  };
