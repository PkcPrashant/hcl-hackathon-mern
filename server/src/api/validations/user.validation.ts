import { z } from "zod";

export const idSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "Id must be a positive integer")
    .transform((val) => parseInt(val, 10)),
});

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const updateUserSchema = createUserSchema;
