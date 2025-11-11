import { connectDB, sequelize } from "./config/db.js";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const startServer = async () => {
  try {
    await connectDB();

    // 🔧 Reset tables completely (run once)
    await sequelize.sync({ force: true });
    console.log("✅ Database reset and synced successfully.");

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();
