import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import testcaseRoutes from "./routes/testcase.routes.js";
import executionRoutes from "./routes/execution.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";

dotenv.config();

const app = express();
const swaggerDocument = YAML.load("./src/swagger/swagger.yaml");

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/testcases", testcaseRoutes);
app.use("/api/executions", executionRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
