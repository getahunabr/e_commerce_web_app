import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Controller to create a new user
export const createUser = async (req, res) => {
  console.log("Request body:", req.body);

  const { name, email, password, isAdmin = false } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });
    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(201).json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      },
      token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    console.error(error.stack);
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  console.log("👉 Login route hit");
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
