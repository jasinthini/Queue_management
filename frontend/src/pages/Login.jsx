import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    login({
      name: "Queue Manager",
      email: email,
      role: "Administrator",
    });

    navigate("/dashboard");
  };

  return (
    <div className="container-fluid min-vh-100 bg-light">
      <div className="row min-vh-100">

        {/* LEFT SIDE */}
        <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center login-left text-white p-5">
          <div style={{ maxWidth: "520px" }}>

            <div className="d-flex align-items-center mb-4">
              <div
                className="bg-white text-primary rounded-3 d-flex align-items-center justify-content-center fw-bold me-3"
                style={{
                  width: "55px",
                  height: "55px",
                  fontSize: "28px",
                }}
              >
                Q
              </div>

              <div>
                <h2 className="fw-bold mb-0">QueueFlow</h2>
                <small className="opacity-75">
                  Virtual Queue Management
                </small>
              </div>
            </div>

            <h1 className="display-5 fw-bold mb-4">
              Manage queues.
              <br />
              Serve people better.
            </h1>

            <p className="lead opacity-75 mb-5">
              A simple and powerful virtual queue management system
              for clinics, banks, service centers and organizations.
            </p>

            <div className="row g-3">

              <div className="col-md-6">
                <div className="bg-white bg-opacity-10 rounded-3 p-3">
                  <h5 className="fw-bold">🎟️ Virtual Tokens</h5>
                  <small className="opacity-75">
                    Generate and manage customer tokens digitally.
                  </small>
                </div>
              </div>

              <div className="col-md-6">
                <div className="bg-white bg-opacity-10 rounded-3 p-3">
                  <h5 className="fw-bold">🏢 Multi-Counter</h5>
                  <small className="opacity-75">
                    Manage multiple service counters easily.
                  </small>
                </div>
              </div>

              <div className="col-md-6">
                <div className="bg-white bg-opacity-10 rounded-3 p-3">
                  <h5 className="fw-bold">📊 Live Queue</h5>
                  <small className="opacity-75">
                    Monitor queue status in real time.
                  </small>
                </div>
              </div>

              <div className="col-md-6">
                <div className="bg-white bg-opacity-10 rounded-3 p-3">
                  <h5 className="fw-bold">📈 Reports</h5>
                  <small className="opacity-75">
                    Track performance and service statistics.
                  </small>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-6 d-flex align-items-center justify-content-center p-4 p-md-5">

          <div style={{ width: "100%", maxWidth: "450px" }}>

            {/* Mobile Logo */}
            <div className="d-lg-none text-center mb-4">
              <div
                className="bg-primary text-white rounded-3 d-inline-flex align-items-center justify-content-center fw-bold mb-2"
                style={{
                  width: "55px",
                  height: "55px",
                  fontSize: "28px",
                }}
              >
                Q
              </div>

              <h3 className="fw-bold mb-0">QueueFlow</h3>

              <small className="text-muted">
                Virtual Queue Management
              </small>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5">

              <div className="mb-4">
                <h2 className="fw-bold">Welcome Back 👋</h2>

                <p className="text-muted mb-0">
                  Sign in to manage your virtual queues.
                </p>
              </div>

              <form onSubmit={handleSubmit}>

                {/* EMAIL */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Email Address
                  </label>

                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* PASSWORD */}
                <div className="mb-3">

                  <div className="d-flex justify-content-between">
                    <label className="form-label fw-semibold">
                      Password
                    </label>

                    <button
                      type="button"
                      className="btn btn-link btn-sm text-decoration-none p-0"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>

                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control form-control-lg"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                </div>

                {/* REMEMBER */}
                <div className="d-flex justify-content-between align-items-center mb-4">

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="remember"
                    />

                    <label
                      className="form-check-label text-muted"
                      htmlFor="remember"
                    >
                      Remember me
                    </label>
                  </div>

                  <button
                    type="button"
                    className="btn btn-link text-decoration-none p-0"
                  >
                    Forgot password?
                  </button>

                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="btn login-button btn-lg w-100 fw-semibold"
                >
                  Sign In →
                </button>

              </form>

              <div className="text-center mt-4">

                <span className="text-muted">
                  Don't have an account?{" "}
                </span>

                <Link
                  to="/register"
                  className="fw-semibold text-decoration-none"
                >
                  Create account
                </Link>

              </div>

            </div>

            <p className="text-center text-muted small mt-4">
              © 2026 QueueFlow. Virtual Queue Management System.
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;