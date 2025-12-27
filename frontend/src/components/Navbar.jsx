import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-blue-600";

  return (
    <nav className="h-16 bg-white border-b shadow-sm px-6 flex items-center justify-between">
      
      {/* Left: Brand + Links */}
      <div className="flex items-center gap-10">
        {/* Brand */}
        <div className="text-xl font-bold text-blue-600">
          TCMS
        </div>

        {/* Navigation */}
        <div className="flex gap-6 text-sm">
          <Link className={isActive("/dashboard")} to="/dashboard">
            Dashboard
          </Link>

          <Link className={isActive("/testcases")} to="/testcases">
            Test Cases
          </Link>

          {["admin", "test-lead"].includes(user.role) && (
            <Link className={isActive("/projects")} to="/projects">
              Projects
            </Link>
          )}

          {user.role !== "read-only" && (
            <Link className={isActive("/executions")} to="/executions">
              Executions
            </Link>
          )}
        </div>
      </div>

      {/* Right: User + Logout */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 capitalize">
          {user.role.replace("-", " ")}
        </span>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1.5 rounded-md text-sm hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
