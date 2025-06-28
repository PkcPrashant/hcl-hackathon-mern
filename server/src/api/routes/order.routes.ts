import express from "express";
import { ordersController } from "../controllers/orders.controller";

const router = express.Router();

router.get("/test", ordersController.test);

export default router;
