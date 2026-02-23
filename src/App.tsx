import { NavLink } from "react-router-dom";
import AppRouter from "./Router";

export default function App() {
  return (
    <div className="min-h-screen text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 border-b bg-gray-500">
        <div className="text-xl font-semibold tracking-wide">
          Cat App
        </div>

        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors duration-200 ${
                isActive
                  ? "border-b-2 border-blue-500 pb-1"
                  : "hover:text-white"
              }`
            }
          >
            List
          </NavLink>

          <NavLink
            to="/upload"
            className={({ isActive }) =>
              `transition-colors duration-200 ${
                isActive
                  ? " border-b-2 border-blue-500 pb-1"
                  : "text-gray-400 hover:text-white"
              }`
            }
          >
            Upload
          </NavLink>
        </div>
      </nav>

      {/* Router Content */}
      <main className="p-8">
        <AppRouter />
      </main>
    </div>
  );
}