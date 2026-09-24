import { NavLink } from "react-router-dom";

const menuItems = [
  { path: "/dashboard", icon: "▦", label: "Dashboard" },
  { path: "/queue", icon: "☷", label: "Queue Management" },
  { path: "/check-in", icon: "＋", label: "Customer Check-In" },
  { path: "/counters", icon: "▣", label: "Counters" },
  { path: "/services", icon: "⚙", label: "Services" },
  { path: "/branches", icon: "⌂", label: "Branches" },
  { path: "/organizations", icon: "◉", label: "Organizations" },
  { path: "/reports", icon: "▤", label: "Reports" },
  { path: "/profile", icon: "●", label: "Profile" },
];

function Sidebar() {
  return (
    <aside className="sidebar">

      {/* LOGO */}
      <div className="sidebar-logo">

        <div className="logo-icon">
          Q
        </div>

        <div className="logo-text">
          <strong>QueueFlow</strong>
          <span>Virtual Queue System</span>
        </div>

      </div>

      {/* NAVIGATION */}
      <nav className="sidebar-nav">

        <p className="sidebar-heading">
          MAIN MENU
        </p>

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">
              {item.icon}
            </span>

            <span>
              {item.label}
            </span>
          </NavLink>
        ))}

      </nav>

      {/* SYSTEM STATUS */}
      <div className="sidebar-footer">

        <span className="online-dot"></span>

        <div>
          <strong>System Online</strong>
          <small>All services running</small>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;