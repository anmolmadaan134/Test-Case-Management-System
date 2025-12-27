import { BrowserRouter, Routes, Route } from "react-router-dom";
import Projects from "./pages/Projects";
import Executions from "./pages/Executions";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import './App.css'
import { useAuth } from "./context/Authcontext.jsx";
import Layout from "./components/Layout";
import { Navigate } from "react-router-dom";
import TestCases from "./pages/Testcases";
import "./charts/chartConfig.js"

function App() {
  function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
}

  return (
    <>
        
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/executions" element={<Executions />} />
         <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

             <Route
          path="/testcases"
          element={
            <ProtectedRoute>
              <Layout>
                <TestCases />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    
    </>
  )
}

export default App
