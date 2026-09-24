
import { useState } from "react";

const initialBranches = [
  {
    id: 1,
    name: "Jaffna Main Branch",
    location: "Jaffna",
    counters: 6,
    customers: 34,
    status: "Open",
  },
  {
    id: 2,
    name: "Colombo City Branch",
    location: "Colombo",
    counters: 8,
    customers: 52,
    status: "Open",
  },
  {
    id: 3,
    name: "Kandy Branch",
    location: "Kandy",
    counters: 5,
    customers: 21,
    status: "Open",
  },
];

function Branches() {
  const [branches, setBranches] = useState(initialBranches);

  const toggleBranch = (id) => {
    setBranches((items) =>
      items.map((branch) =>
        branch.id === id
          ? {
              ...branch,
              status:
                branch.status === "Open"
                  ? "Closed"
                  : "Open",
            }
          : branch
      )
    );
  };

  const openBranches = branches.filter(
    (branch) => branch.status === "Open"
  ).length;

  const totalCounters = branches.reduce(
    (total, branch) => total + branch.counters,
    0
  );

  const totalWaiting = branches.reduce(
    (total, branch) => total + branch.customers,
    0
  );

  return (
    <div className="page">
      {/* Header */}

      <div className="page-header">
        <div>
          <h1>Branches</h1>
          <p>
            Monitor your organisation's service branches.
          </p>
        </div>

        <button className="btn btn-primary px-4">
          + Add Branch
        </button>
      </div>

      {/* Statistics */}

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-secondary mb-2">
                Total Branches
              </p>

              <h2 className="fw-bold text-dark mb-1">
                {branches.length}
              </h2>

              <small className="text-secondary">
                Registered branches
              </small>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-secondary mb-2">
                Open Branches
              </p>

              <h2 className="fw-bold text-success mb-1">
                {openBranches}
              </h2>

              <small className="text-secondary">
                Currently operating
              </small>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-secondary mb-2">
                Total Waiting
              </p>

              <h2 className="fw-bold mb-1 text-dark">
                {totalWaiting}
              </h2>

              <small className="text-secondary">
                Across all branches
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Branches */}

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="p-4 border-bottom">
            <h5 className="fw-bold mb-1">
              Service Branches
            </h5>

            <p className="text-secondary small mb-0">
              View branch locations, counters and queue status.
            </p>
          </div>

          <div className="row g-0">
            {branches.map((branch) => (
              <div
                className="col-lg-4 col-md-6"
                key={branch.id}
              >
                <div className="branch-item p-4 h-100">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="branch-icon">
                      ⌂
                    </div>

                    <span
                      className={`badge ${
                        branch.status === "Open"
                          ? "text-bg-success"
                          : "text-bg-secondary"
                      }`}
                    >
                      {branch.status}
                    </span>
                  </div>

                  <h5 className="fw-bold text-dark mb-1">
                    {branch.name}
                  </h5>

                  <p className="text-secondary small mb-4">
                    📍 {branch.location}
                  </p>

                  <div className="row g-2 mb-4">
                    <div className="col-6">
                      <div className="branch-stat">
                        <strong>
                          {branch.counters}
                        </strong>
                        <span>Counters</span>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="branch-stat">
                        <strong>
                          {branch.customers}
                        </strong>
                        <span>Waiting</span>
                      </div>
                    </div>
                  </div>

                  <button
                    className={`btn btn-sm w-100 ${
                      branch.status === "Open"
                        ? "btn-outline-danger"
                        : "btn-outline-success"
                    }`}
                    onClick={() =>
                      toggleBranch(branch.id)
                    }
                  >
                    {branch.status === "Open"
                      ? "Close Branch"
                      : "Open Branch"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Total counters information */}

      <div className="alert mt-4 border-0 shadow-sm branch-info">
        <strong>{totalCounters}</strong> service counters are
        currently configured across all branches.
      </div>
    </div>
  );
}

export default Branches;

