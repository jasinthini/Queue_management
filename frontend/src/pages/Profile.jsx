
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const name = user?.name || "Queue Manager";
  const email = user?.email || "admin@queue.com";
  const role = user?.role || "Administrator";

  return (
    <div className="page">
      {/* Header */}

      <div className="page-header">
        <div>
          <h1>My Profile</h1>
          <p>
            View and manage your account information.
          </p>
        </div>
      </div>

      {/* Profile Header */}

      <div className="card border-0 shadow-sm profile-main-card mb-4">
        <div className="card-body p-4">
          <div className="d-flex align-items-center gap-4 flex-wrap">
            <div className="profile-avatar">
              {name.charAt(0).toUpperCase()}
            </div>

            <div className="flex-grow-1">
              <h2 className="fw-bold text-dark mb-1">
                {name}
              </h2>

              <p className="text-secondary mb-2">
                {email}
              </p>

              <span className="badge profile-role-badge">
                {role}
              </span>
            </div>

            <div className="profile-status">
              <span className="profile-status-dot"></span>
              Active Account
            </div>
          </div>
        </div>
      </div>

      {/* Account Information */}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <h5 className="fw-bold text-dark mb-1">
            Account Information
          </h5>

          <p className="text-secondary small mb-4">
            Your registered account details.
          </p>

          <div className="row g-3">
            <div className="col-md-6">
              <div className="profile-detail-box">
                <span>Full Name</span>
                <strong>{name}</strong>
              </div>
            </div>

            <div className="col-md-6">
              <div className="profile-detail-box">
                <span>Email Address</span>
                <strong>{email}</strong>
              </div>
            </div>

            <div className="col-md-6">
              <div className="profile-detail-box">
                <span>Role</span>
                <strong>{role}</strong>
              </div>
            </div>

            <div className="col-md-6">
              <div className="profile-detail-box">
                <span>Account Status</span>
                <strong className="text-success">
                  ● Active
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security */}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <h5 className="fw-bold text-dark mb-1">
            Security
          </h5>

          <p className="text-secondary small mb-4">
            Manage your account session.
          </p>

          <div className="profile-security-box">
            <div>
              <strong>Current Session</strong>
              <p>
                You are securely logged in to QueueFlow.
              </p>
            </div>

            <span className="badge text-bg-success">
              Secure
            </span>
          </div>
        </div>
      </div>

      {/* Logout */}

      <div className="d-flex justify-content-end">
        <button
          className="btn btn-outline-danger px-4"
          onClick={handleLogout}
        >
          ↪ Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
