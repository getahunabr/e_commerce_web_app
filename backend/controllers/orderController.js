import Order from "../models/order.js";
import Product from "../models/product.js";
import User from "../models/User.js";

// create new order
export const createOrder = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const totalPrice = product.price * quantity;
    const order = await Order.create({
      userId,
      productId,
      quantity,
      totalPrice,
      status: "Pending",
    });
    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const { userId } = req.query; // e.g. /orders?userId=1
    const where = userId ? { userId, status: "Pending" } : {};

    const orders = await Order.findAll({
      where,
      include: [User, Product],
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single order by ID

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, { include: [User, Product] });
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, quantity } = req.body;
    const order = await Order.findByPk(id);

    if (quantity) {
      const product = await Product.findByPk(order.productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      order.totalPrice = product.price * quantity;
      order.quantity = quantity;
    }

    if (order) {
      order.status = status;
      await order.save();
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (order) {
      await order.destroy();
      res.status(200).json({ message: "Order deleted successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const checkoutOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const updated = await Order.update(
      { status: "paid" },
      { where: { userId, status: "Pending" } }
    );
    res
      .status(200)
      .json({ message: "Orders checked out successfully", updated });
  } catch (error) {
    console.error("Error checking out orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};
