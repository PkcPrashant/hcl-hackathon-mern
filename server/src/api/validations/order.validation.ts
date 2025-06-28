import { z } from "zod";

export const idSchema = z.object({
  id: z
    .string()
    .regex(/^[a-f\d]{24}$/i, "Invalid ObjectId format"),
});

export const createOrderSchema = z.object({
  createdBy: z.string().min(1, "createdBy is required"),
  orderRefNo: z.string().min(1, "orderRefNo is required"),
  orderValue: z.string().min(1, "orderValue is required"),
  orderStatus: z.string().min(1, "orderStatus is required"),
  idSecurityDetail: z.string().min(1, "idSecurityDetail is required"),
  transactionType: z.string().min(1, "transactionType is required"),
  // modifiedBy and modifiedOn are not needed on create
});

export const updateOrderSchema = z.object({
  createdBy: z.string().optional(),
  orderRefNo: z.string().optional(),
  orderValue: z.string().optional(),
  orderStatus: z.string().optional(),
  idSecurityDetail: z.string().optional(),
  transactionType: z.string().optional(),
  modifiedBy: z.string().optional(),
  modifiedOn: z.date().optional(),
});
