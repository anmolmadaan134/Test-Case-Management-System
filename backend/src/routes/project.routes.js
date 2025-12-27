import { Router } from "express";
import { db } from "../config/db.js";
import redis from "../config/redis.js";
import auth from "../middlewares/auth.js";
import rbac from "../middlewares/rbac.js";

const router = Router();

router.get("/", auth, async (req, res) => {
  const cached = await redis.get("projects:list");
  if (cached) return res.json(JSON.parse(cached));

  const result = await db.query("SELECT * FROM projects");
  await redis.setEx("projects:list", 3600, JSON.stringify(result.rows));

  res.json(result.rows);
});

router.post("/", auth, rbac(["admin", "test-lead"]), async (req, res) => {
  const { name, description, version, status } = req.body;

  await db.query(
    "INSERT INTO projects(name, description, version, status) VALUES ($1,$2,$3,$4)",
    [name, description, version, status]
  );

  await redis.del("projects:list");
  res.status(201).json({ message: "Project created" });
});

export default router;
