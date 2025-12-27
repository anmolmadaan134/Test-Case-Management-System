import { Router } from "express";
import { db } from "../config/db.js";
import redis from "../config/redis.js";
import auth from "../middlewares/auth.js";
import rbac from "../middlewares/rbac.js";

const router = Router();


router.get("/", auth, async (req, res) => {
  const { projectId } = req.query;

  if (!projectId) {
    return res.status(400).json({ message: "projectId required" });
  }

  const result = await db.query(
    `
    SELECT te.*, tc.title
    FROM test_executions te
    JOIN test_cases tc ON tc.id = te.test_case_id
    WHERE tc.project_id = $1
    `,
    [projectId]
  );

  res.json(result.rows);
});
router.post("/", auth, rbac(["admin","test-lead","tester"]), async (req, res) => {
  const { test_case_id, status, comments,projectId } = req.body;

  
  if (!projectId || !test_case_id) {
    return res.status(400).json({ message: "projectId and test_case_id required" });
  }

  
  const tc = await db.query(
    "SELECT project_id FROM test_cases WHERE id = $1",
    [test_case_id]
  );

  if (tc.rowCount === 0) {
    return res.status(404).json({ message: "Test case not found" });
  }

  if (tc.rows[0].project_id !== Number(projectId)) {
    return res.status(400).json({
      message: "Test case does not belong to selected project"
    });
  }

  await db.query(
    "INSERT INTO test_executions(test_case_id, executed_by, status, comments) VALUES ($1,$2,$3,$4)",
    [test_case_id, req.user.id, status, comments]
  );

  await redis.del("analytics:summary");
  res.status(201).json({ message: "Execution recorded" });
});

export default router;
