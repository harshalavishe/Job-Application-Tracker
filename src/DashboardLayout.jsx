
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import "./DashboardLayout.css";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Add Job", path: "/add-job", icon: "➕" },
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Applications", path: "/applications", icon: "💼" },
    { name: "My Profile", path: "/profile", icon: "👤" },
    { name: "About", path: "/about", icon: "ℹ️" },
    { name: "Contact", path: "/contact", icon: "📩" }
  ];

  return (
    <div className="app-wrapper">

      {/* TOP NAVBAR */}
      <Navbar />

      {/* SIDEBAR + MAIN CONTENT */}
      <div className="tracker-layout">

        <aside className="tracker-sidebar">

          <div className="sidebar-logo">
            <span>💼</span>
            <h2>Tracklly</h2>
          </div>

          <h3 className="sidebar-menu-title">Menu</h3>

          <nav className="sidebar-navigation">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <span className="sidebar-icon">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </nav>

          <button
            className="sidebar-logout"
            onClick={() => navigate("/")}
          >
            🚪 Logout
          </button>

        </aside>

        <main className="tracker-main">
          <div className="tracker-content">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}
