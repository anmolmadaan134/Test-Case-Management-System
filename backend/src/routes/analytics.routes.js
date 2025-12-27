import express from "express";
import { executionSummary,executionTrend,priorityDistribution,dashboardStats } from "../../controllers/analytics.controller.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/summary", auth, (req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
}, executionSummary);

router.get("/trend", auth, (req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
}, executionTrend);

router.get("/priority", auth, (req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
}, priorityDistribution);

router.get("/dashboard", auth, dashboardStats);


export default router;
