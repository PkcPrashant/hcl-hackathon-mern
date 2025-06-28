import express from "express";
import { userController } from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import {
  idSchema,
  createUserSchema,
  updateUserSchema,
} from "../validations/user.validation";


const router = express.Router();

router.get("/", userController.getAll);

router.get("/:id", validate(idSchema, "params"), userController.getById);

router.post(
  "/",
  validate(createUserSchema, "body"),
  userController.create
);

router.put(
  "/:id",
  validate(idSchema, "params"),
  validate(updateUserSchema, "body"),
  userController.update
);

router.delete(
  "/:id",
  validate(idSchema, "params"),
  userController.delete
);

export default router;
