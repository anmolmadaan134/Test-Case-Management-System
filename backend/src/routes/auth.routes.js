import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { db } from "../config/db.js";
import { authLimiter } from "../middlewares/rateLimit.js";

const router = Router();

router.post("/login", authLimiter, async (req, res) => {
  const { email, password } = req.body;

  const result = await db.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (!result.rows.length) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token, role: user.role });
});

export default router;
