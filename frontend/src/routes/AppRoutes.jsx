import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Projects = lazy(() => import("../pages/Projects"));
const TestCases = lazy(() => import("../pages/Testcases"));
const Executions = lazy(() => import("../pages/Executions"));
const Login = lazy(() => import("../pages/Login"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={
          <ProtectedRoute roles={["admin","test-lead","tester","read-only"]}>
            <Dashboard />
          </ProtectedRoute>
        }/>

        <Route path="/projects" element={
          <ProtectedRoute roles={["admin","test-lead"]}>
            <Projects />
          </ProtectedRoute>
        }/>

        <Route path="/testcases" element={
          <ProtectedRoute roles={["admin","test-lead","tester","read-only"]}>
            <TestCases />
          </ProtectedRoute>
        }/>

        <Route path="/executions" element={
          <ProtectedRoute roles={["admin","test-lead","tester"]}>
            <Executions />
          </ProtectedRoute>
        }/>
      </Routes>
    </Suspense>
  );
}
