import express from "express";
import { orderController } from "../controllers/order.controller";
import { validate } from "../middlewares/validate.middleware";
import {
  idSchema,
  createOrderSchema,
  updateOrderSchema,
} from "../validations/order.validation";


const router = express.Router();

router.get("/", orderController.getAll);

router.get("/:id", validate(idSchema, "params"), orderController.getById);

router.post(
  "/",
  validate(createOrderSchema, "body"),
  orderController.create
);

router.put(
  "/:id",
  validate(idSchema, "params"),
  validate(updateOrderSchema, "body"),
  orderController.update
);

// router.delete(
//   "/:id",
//   validate(idSchema, "params"),
//   orderController.delete
// );

export default router;
