import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Product from "./product.js";
import User from "./User.js";
// Define the order model

const Order = sequelize.define(
  "Order",
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Pending",
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);
// Relationships
User.hasMany(Order, { foreignKey: "userId" });
Product.hasMany(Order, { foreignKey: "productId" });

Order.belongsTo(Product, { foreignKey: "productId" });
Order.belongsTo(User, { foreignKey: "userId" });
export default Order;
