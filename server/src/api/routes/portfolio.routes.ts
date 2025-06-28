import express from "express";
import { portfolioController } from '../controllers/portfolio.controller';
import { validate } from '../middlewares/validate.middleware';
import { createPortfolioSchema, idSchema, updatePortfolioSchema } from '../validations/portfolio.validation';

const router = express.Router();


router.get("/", portfolioController.getAll);

router.get("/:id", validate(idSchema, "params"), portfolioController.getById);

router.post(
  "/",
  validate(createPortfolioSchema, "body"),
  portfolioController.create
);

router.put(
  "/:id",
  validate(idSchema, "params"),
  validate(updatePortfolioSchema, "body"),
  portfolioController.update
);

// router.delete(
//   "/:id",
//   validate(idSchema, "params"),
//   portfolioController.delete
// );

export default router;
