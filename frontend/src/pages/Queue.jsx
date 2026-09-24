import { useMemo, useState } from "react";

const initialQueue = [
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
  {
    token: "A-025",
    customer: "Raj",
    service: "Account Inquiry",
    counter: "Counter 01",
    status: "Waiting",
  },
];

function Queue() {
  const [queue, setQueue] = useState(initialQueue);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const updateStatus = (token, status) => {
    setQueue((items) =>
      items.map((item) =>
        item.token === token
          ? { ...item, status }
          : item
      )
    );
  };

  const callNext = () => {
    const nextCustomer = queue.find(
      (item) => item.status === "Waiting"
    );

    if (nextCustomer) {
      updateStatus(nextCustomer.token, "Serving");
    }
  };

  const filteredQueue = useMemo(() => {
    return queue.filter((item) => {
      const matchesSearch =
        item.token.toLowerCase().includes(search.toLowerCase()) ||
        item.customer.toLowerCase().includes(search.toLowerCase()) ||
        item.service.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || item.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [queue, search, filter]);

  return (
    <div className="page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1>Queue Management</h1>
          <p>
            Monitor and manage customers waiting for service.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={callNext}
        >
          📢 Call Next
        </button>
      </div>

      {/* STATISTICS */}
      <div className="dashboard-grid">

        <div className="stat-card">
          <span>Waiting</span>
          <strong>
            {queue.filter(
              (q) => q.status === "Waiting"
            ).length}
          </strong>
          <small>Customers waiting</small>
        </div>

        <div className="stat-card">
          <span>Serving</span>
          <strong>
            {queue.filter(
              (q) => q.status === "Serving"
            ).length}
          </strong>
          <small>Currently serving</small>
        </div>

        <div className="stat-card">
          <span>Completed</span>
          <strong>
            {queue.filter(
              (q) => q.status === "Completed"
            ).length}
          </strong>
          <small>Completed today</small>
        </div>

        <div className="stat-card">
          <span>Total Queue</span>
          <strong>{queue.length}</strong>
          <small>Today's customers</small>
        </div>

      </div>

      {/* QUEUE TABLE */}
      <div className="section-card">

        <div className="section-title">
          <div>
            <h2>Current Queue</h2>
            <p>Live customer queue status</p>
          </div>
        </div>

        {/* SEARCH + FILTER */}
        <div className="queue-toolbar">

          <div className="queue-search">
            <input
              type="text"
              placeholder="Search token, customer or service..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <select
            className="queue-filter"
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >
            <option value="All">All Status</option>
            <option value="Waiting">Waiting</option>
            <option value="Serving">Serving</option>
            <option value="Completed">Completed</option>
            <option value="Skipped">Skipped</option>
          </select>

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
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredQueue.length > 0 ? (
                filteredQueue.map((item) => (
                  <tr key={item.token}>

                    <td>
                      <strong className="token-number">
                        {item.token}
                      </strong>
                    </td>

                    <td>
                      {item.customer}
                    </td>

                    <td>
                      {item.service}
                    </td>

                    <td>
                      {item.counter}
                    </td>

                    <td>
                      <span
                        className={`status ${item.status.toLowerCase()}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>

                      <div className="action-buttons">

                        {item.status === "Waiting" && (
                          <button
                            className="small-button"
                            onClick={() =>
                              updateStatus(
                                item.token,
                                "Serving"
                              )
                            }
                          >
                            Call
                          </button>
                        )}

                        {item.status === "Serving" && (
                          <button
                            className="small-button success"
                            onClick={() =>
                              updateStatus(
                                item.token,
                                "Completed"
                              )
                            }
                          >
                            Complete
                          </button>
                        )}

                        {item.status !== "Completed" &&
                          item.status !== "Skipped" && (
                            <button
                              className="small-button danger"
                              onClick={() =>
                                updateStatus(
                                  item.token,
                                  "Skipped"
                                )
                              }
                            >
                              Skip
                            </button>
                          )}

                      </div>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="empty-queue"
                  >
                    No customers found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Queue;