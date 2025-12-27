import { Router } from "express";
import { db } from "../config/db.js";
import auth from "../middlewares/auth.js";
import rbac from "../middlewares/rbac.js";
import {Parser} from "json2csv"

const router = Router();

// router.get("/", auth, async (req, res) => {
//   const result = await db.query("SELECT * FROM test_cases");
//   res.json(result.rows);
// });

router.get("/export", auth, async (req, res) => {
  try {
    const { projectId } = req.query;

    if (!projectId) {
      return res.status(400).json({ message: "projectId is required" });
    }

    // Fetch project-specific test cases
    const result = await db.query(
      `
      SELECT 
        title,
        description,
        priority,
        type
      FROM test_cases
      WHERE project_id = $1
      ORDER BY id DESC
      `,
      [projectId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No test cases found" });
    }

    // Convert JSON → CSV
    const parser = new Parser({
      fields: ["title", "description", "priority", "type"],
    });

    const csv = parser.parse(result.rows);

    // Send file
    res.header("Content-Type", "text/csv");
    res.header(
      "Content-Disposition",
      `attachment; filename=testcases_project_${projectId}.csv`
    );

    return res.send(csv);

  } catch (error) {
    console.error("CSV export error:", error);
    res.status(500).json({ message: "Failed to export CSV" });
  }
});


router.get("/", auth, async (req, res) => {
  const { projectId } = req.query;

  if (!projectId) {
    return res.status(400).json({ message: "projectId required" });
  }

  const result = await db.query(
    "SELECT * FROM test_cases WHERE project_id = $1",
    [projectId]
  );

  res.json(result.rows);
});

router.post("/", auth, rbac(["admin", "test-lead"]), async (req, res) => {
  const { title, description, priority, type, projectId } = req.body;

    if (!projectId) {
    return res.status(400).json({ message: "projectId is required" });
  }

  await db.query(
    "INSERT INTO test_cases(title, description, priority, type,project_id) VALUES ($1,$2,$3,$4,$5)",
    [title, description, priority, type,projectId]
  );

  res.status(201).json({ message: "Test case created" });
});



export default router;
