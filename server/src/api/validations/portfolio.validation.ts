import { z } from "zod";

export const createPortfolioSchema = z.object({
  portfolioName: z.string().min(1, "Portfolio name is required"),
  portfolioType: z.string().min(1, "Portfolio type is required"),
});

export const updatePortfolioSchema = z.object({
  portfolioName: z.string().min(1).optional(),
  portfolioType: z.string().min(1).optional(),
  modifiedBy: z
    .string()
    .regex(/^[a-f\d]{24}$/i, "Invalid User ID")
    .optional(),
});

export const idSchema = z.object({
  id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid ObjectId format"),
});