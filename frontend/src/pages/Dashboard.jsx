import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const queueData = [
  {
    token: "A-021",
    customer: "Kavitha",
    service: "Account Opening",
    counter: "Counter 01",
    status: "Waiting",
  },
  {
    token: "A-022",
    customer: "Suresh",
    service: "Cash Deposit",
    counter: "Counter 02",
    status: "Serving",
  },
  {
    token: "A-023",
    customer: "Nimal",
    service: "Customer Support",
    counter: "Counter 03",
    status: "Waiting",
  },
  {
    token: "A-024",
    customer: "Fathima",
    service: "Cash Withdrawal",
    counter: "Counter 04",
    status: "Completed",
  },
];

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1>
            Good morning, {user?.name || "Manager"} 👋
          </h1>

          <p>
            Here's what's happening with your queues today.
          </p>
        </div>

        <Link to="/check-in" className="primary-button">
          + New Check-In
        </Link>
      </div>

      {/* STATISTICS */}
      <div className="dashboard-grid">

        <div className="stat-card">
          <span>Total Waiting</span>
          <strong>24</strong>
          <small>Customers in queue</small>
        </div>

        <div className="stat-card">
          <span>Now Serving</span>
          <strong>08</strong>
          <small>Currently being served</small>
        </div>

        <div className="stat-card">
          <span>Completed Today</span>
          <strong>126</strong>
          <small>Successful services</small>
        </div>

        <div className="stat-card">
          <span>Average Wait</span>
          <strong>12m</strong>
          <small>Average customer wait</small>
        </div>

      </div>

      {/* LIVE QUEUE */}
      <div className="section-card">

        <div className="section-title">
          <div>
            <h2>Live Queue</h2>
            <p>Current customer queue status</p>
          </div>

          <Link to="/queue">
            View All →
          </Link>
        </div>

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Token</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Counter</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {queueData.map((item) => (
                <tr key={item.token}>

                  <td>
                    <strong>{item.token}</strong>
                  </td>

                  <td>{item.customer}</td>

                  <td>{item.service}</td>

                  <td>{item.counter}</td>

                  <td>
                    <span
                      className={`status ${item.status.toLowerCase()}`}
                    >
                      {item.status}
                    </span>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="quick-actions">

        <Link to="/check-in" className="quick-card">
          <span>🎟️</span>
          <strong>Create Token</strong>
          <small>Check in a new customer</small>
        </Link>

        <Link to="/counters" className="quick-card">
          <span>🖥️</span>
          <strong>Manage Counters</strong>
          <small>View counter status</small>
        </Link>

        <Link to="/reports" className="quick-card">
          <span>📊</span>
          <strong>View Reports</strong>
          <small>Check today's performance</small>
        </Link>

      </div>

    </div>
  );
}

export default Dashboard;