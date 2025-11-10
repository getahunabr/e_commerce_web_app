import { connectDB, sequelize } from "./config/db.js";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync(); // Sync models with the database
    const PORT = process.env.PORT || 8000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
