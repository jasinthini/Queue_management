import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <header className="top-navbar">

      {/* LEFT */}
      <div className="navbar-title">
        <h2>Queue Management</h2>
        <span>Manage your virtual queues efficiently</span>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">

        {/* Notification */}
        <button className="notification-button" type="button">
          🔔
          <span className="notification-dot"></span>
        </button>

        {/* User */}
        <div className="navbar-user">

          <div className="user-avatar">
            {(user?.name || "M").charAt(0).toUpperCase()}
          </div>

          <div className="user-info">
            <strong>{user?.name || "Manager"}</strong>
            <small>{user?.role || "Administrator"}</small>
          </div>

        </div>

        {/* Logout */}
        <button
          type="button"
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default Navbar;