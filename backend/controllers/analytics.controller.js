import { db } from "../src/config/db.js";

export const executionSummary = async (req, res) => {
  const { projectId } = req.query;

  if (!projectId || projectId === "null" || projectId==='undefined') {
    return res.status(400).json({
      message: "projectId is required and must be a number"
    });
  }

  const result = await db.query(
    `
    SELECT status, COUNT(*)::int as count
    FROM test_executions te
    JOIN test_cases tc ON tc.id = te.test_case_id
    WHERE tc.project_id = $1
    GROUP BY status
    `,
    [Number(projectId)]
  );

  res.json(result.rows);
};

// export const executionTrend = async (req, res) => {
//   const { projectId } = req.query;
//   if (!projectId || projectId === "null") {
//   return res.status(400).json([]);
// }

//   const result = await db.query(
//     `
//     SELECT TO_CHAR(executed_at, 'YYYY-MM-DD') AS date, COUNT(*)::int AS count
//     FROM test_executions te
//     JOIN test_cases tc ON tc.id = te.test_case_id
//     WHERE tc.project_id = $1
//     GROUP BY DATE(executed_at)
//     ORDER BY date
//     `,
//     [projectId]
//   );

//   res.json(result.rows);
// };

// export const executionTrend = async (req, res) => {
//   const { projectId } = req.query;

//   if (!projectId || projectId === "null" || projectId === "undefined") {
//     return res.status(400).json([]);
//   }

//   const result = await db.query(
//     `
//     SELECT 
//       TO_CHAR(te.executed_at, 'YYYY-MM-DD') AS date,
//       COUNT(*)::int AS count
//     FROM test_executions te
//     JOIN test_cases tc ON tc.id = te.test_case_id
//     WHERE tc.project_id = $1
//     GROUP BY date(te.executed_at)
//     ORDER BY date
//     `,
//     [Number(projectId)]
//   );

//   res.json(result.rows);
// };

export const executionTrend = async (req, res) => {
  const { projectId } = req.query;

  if (!projectId || projectId === "null" || projectId === "undefined") {
    return res.json([]); // 👈 return empty, NOT 400
  }

  const result = await db.query(
    `
    SELECT 
      DATE(te.executed_at) AS date,
      COUNT(*)::int AS count
    FROM test_executions te
    JOIN test_cases tc ON tc.id = te.test_case_id
    WHERE tc.project_id = $1
    GROUP BY DATE(te.executed_at)
    ORDER BY DATE(te.executed_at)
    `,
    [Number(projectId)]
  );

  res.json(result.rows);
};

export const priorityDistribution = async (req, res) => {

    const {projectId} = req.query

    if (!projectId || projectId === "null") {
  return res.status(400).json([]);
}
  const result = await db.query(
    `
    SELECT tc.priority, COUNT(*)::int as count
    FROM test_cases tc
    WHERE tc.project_id = $1
    GROUP BY tc.priority
    `,
    [Number(projectId)]
  );

  res.json(result.rows);
};

export const dashboardStats = async (req, res) => {
  const { projectId } = req.query;

  if (!projectId || projectId === "null") {
    return res.status(400).json({ message: "projectId required" });
  }

  const totalTestsQuery = `
    SELECT COUNT(*)::int AS total
    FROM test_cases
    WHERE project_id = $1
  `;

  const executionStatsQuery = `
    SELECT
      COUNT(*) FILTER (WHERE status = 'Pass')::int AS passed,
      COUNT(*) FILTER (WHERE status = 'Fail')::int AS failed,
      COUNT(*)::int AS total
    FROM test_executions te
    JOIN test_cases tc ON tc.id = te.test_case_id
    WHERE tc.project_id = $1
  `;

  const [testsRes, execRes] = await Promise.all([
    db.query(totalTestsQuery, [projectId]),
    db.query(executionStatsQuery, [projectId]),
  ]);

  const totalTests = testsRes.rows[0].total;
  const { passed, failed, total } = execRes.rows[0];

  const passRate = total ? Math.round((passed / total) * 100) : 0;
  const failRate = total ? Math.round((failed / total) * 100) : 0;

  res.json({
    totalTests,
    passRate,
    failRate,
  });
};

