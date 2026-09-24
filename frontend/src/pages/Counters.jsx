
import { useState } from "react";

const initialCounters = [
  {
    id: "01",
    service: "Account Opening",
    token: "A-022",
    status: "Serving",
  },
  {
    id: "02",
    service: "Cash Deposit",
    token: "B-018",
    status: "Serving",
  },
  {
    id: "03",
    service: "Customer Support",
    token: "-",
    status: "Available",
  },
  {
    id: "04",
    service: "Cash Withdrawal",
    token: "C-011",
    status: "Break",
  },
];

function Counters() {
  const [counters, setCounters] = useState(initialCounters);

  const changeStatus = (id, newStatus) => {
    setCounters((items) =>
      items.map((counter) =>
        counter.id === id
          ? {
              ...counter,
              status: newStatus,
              token:
                newStatus === "Available"
                  ? "-"
                  : counter.token,
            }
          : counter
      )
    );
  };

  const servingCount = counters.filter(
    (counter) => counter.status === "Serving"
  ).length;

  const availableCount = counters.filter(
    (counter) => counter.status === "Available"
  ).length;

  const breakCount = counters.filter(
    (counter) => counter.status === "Break"
  ).length;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Service Counters</h1>
          <p>
            Monitor and manage all service counters in real time.
          </p>
        </div>
      </div>

      {/* Counter Statistics */}

      <div className="dashboard-grid">
        <div className="stat-card">
          <span>Total Counters</span>
          <strong>{counters.length}</strong>
          <small>Active service counters</small>
        </div>

        <div className="stat-card">
          <span>Serving</span>
          <strong>{servingCount}</strong>
          <small>Counters serving customers</small>
        </div>

        <div className="stat-card">
          <span>Available</span>
          <strong>{availableCount}</strong>
          <small>Ready for customers</small>
        </div>

        <div className="stat-card">
          <span>On Break</span>
          <strong>{breakCount}</strong>
          <small>Temporarily unavailable</small>
        </div>
      </div>

      {/* Counter Cards */}

      <div className="counter-grid">
        {counters.map((counter) => (
          <div className="counter-card" key={counter.id}>
            <div className="counter-header">
              <div className="counter-number">
                {counter.id}
              </div>

              <span
                className={`status ${counter.status.toLowerCase()}`}
              >
                {counter.status}
              </span>
            </div>

            <div className="counter-title">
              <h2>Counter {counter.id}</h2>
              <p>{counter.service}</p>
            </div>

            <div className="current-token-box">
              <span>Current Token</span>

              <strong>
                {counter.token === "-"
                  ? "No customer"
                  : counter.token}
              </strong>
            </div>

            <div className="counter-actions">
              {counter.status === "Serving" && (
                <>
                  <button
                    className="secondary-button"
                    onClick={() =>
                      changeStatus(
                        counter.id,
                        "Available"
                      )
                    }
                  >
                    Complete
                  </button>

                  <button
                    className="counter-break-button"
                    onClick={() =>
                      changeStatus(
                        counter.id,
                        "Break"
                      )
                    }
                  >
                    Break
                  </button>
                </>
              )}

              {counter.status === "Available" && (
                <button
                  className="primary-button counter-manage-button"
                  onClick={() =>
                    changeStatus(
                      counter.id,
                      "Serving"
                    )
                  }
                >
                  Start Serving
                </button>
              )}

              {counter.status === "Break" && (
                <button
                  className="primary-button counter-manage-button"
                  onClick={() =>
                    changeStatus(
                      counter.id,
                      "Available"
                    )
                  }
                >
                  Back to Work
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Counters;

