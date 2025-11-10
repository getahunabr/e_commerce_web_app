import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  checkoutOrders,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.post("/checkout", checkoutOrders);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);

export default router;
