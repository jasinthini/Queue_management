
import { useState } from "react";

function Reports() {
  const [period, setPeriod] = useState("Today");

  const handleExport = () => {
    alert("Report export will be connected to the backend.");
  };

  return (
    <div className="page">
      {/* Header */}

      <div className="page-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p>
            Analyse queue performance and service efficiency.
          </p>
        </div>

        <div className="d-flex gap-2">
          <select
            className="form-select"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>

          <button
            className="btn btn-primary px-4"
            onClick={handleExport}
          >
            ↓ Export Report
          </button>
        </div>
      </div>

      {/* Statistics */}

      <div className="row g-4 mb-4">
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm h-100 report-stat-card">
            <div className="card-body">
              <div className="report-stat-icon">
                👥
              </div>

              <p className="text-secondary mb-1">
                Total Customers
              </p>

              <h2 className="fw-bold text-dark mb-1">
                156
              </h2>

              <small className="text-success">
                ↑ 12% from yesterday
              </small>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm h-100 report-stat-card">
            <div className="card-body">
              <div className="report-stat-icon">
                ✓
              </div>

              <p className="text-secondary mb-1">
                Completed
              </p>

              <h2 className="fw-bold text-dark mb-1">
                126
              </h2>

              <small className="text-success">
                80.7% completion rate
              </small>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm h-100 report-stat-card">
            <div className="card-body">
              <div className="report-stat-icon">
                ⏱️
              </div>

              <p className="text-secondary mb-1">
                Average Wait
              </p>

              <h2 className="fw-bold text-dark mb-1">
                12m
              </h2>

              <small className="text-secondary">
                Average customer waiting time
              </small>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm h-100 report-stat-card">
            <div className="card-body">
              <div className="report-stat-icon">
                ⚡
              </div>

              <p className="text-secondary mb-1">
                Average Service
              </p>

              <h2 className="fw-bold text-dark mb-1">
                8m
              </h2>

              <small className="text-secondary">
                Average service time
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Performance */}

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h5 className="fw-bold text-dark mb-1">
                Daily Performance
              </h5>

              <p className="text-secondary small mb-4">
                Service completion and operational efficiency.
              </p>

              {/* Completed */}

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="small fw-semibold text-dark">
                    Completed Customers
                  </span>

                  <strong className="small text-success">
                    81%
                  </strong>
                </div>

                <div
                  className="progress"
                  style={{ height: "9px" }}
                >
                  <div
                    className="progress-bar bg-success"
                    style={{ width: "81%" }}
                  ></div>
                </div>
              </div>

              {/* Satisfaction */}

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="small fw-semibold text-dark">
                    Customer Satisfaction
                  </span>

                  <strong className="small report-teal-text">
                    92%
                  </strong>
                </div>

                <div
                  className="progress"
                  style={{ height: "9px" }}
                >
                  <div
                    className="progress-bar report-teal-bg"
                    style={{ width: "92%" }}
                  ></div>
                </div>
              </div>

              {/* Counter Utilisation */}

              <div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="small fw-semibold text-dark">
                    Counter Utilisation
                  </span>

                  <strong className="small text-primary">
                    76%
                  </strong>
                </div>

                <div
                  className="progress"
                  style={{ height: "9px" }}
                >
                  <div
                    className="progress-bar report-blue-bg"
                    style={{ width: "76%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h5 className="fw-bold text-dark mb-1">
                Queue Summary
              </h5>

              <p className="text-secondary small mb-4">
                Current queue distribution.
              </p>

              <div className="report-summary-item">
                <span>
                  <span className="summary-dot waiting"></span>
                  Waiting
                </span>

                <strong>24</strong>
              </div>

              <div className="report-summary-item">
                <span>
                  <span className="summary-dot serving"></span>
                  Serving
                </span>

                <strong>8</strong>
              </div>

              <div className="report-summary-item">
                <span>
                  <span className="summary-dot completed"></span>
                  Completed
                </span>

                <strong>126</strong>
              </div>

              <div className="report-summary-item">
                <span>
                  <span className="summary-dot skipped"></span>
                  Skipped
                </span>

                <strong>4</strong>
              </div>

              <hr />

              <div className="d-flex justify-content-between">
                <span className="fw-semibold text-dark">
                  Total
                </span>

                <strong className="report-total">
                  162
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Note */}

      <div className="alert report-note border-0 shadow-sm mt-4 mb-0">
        <strong>Report period:</strong> {period} — Data shown
        here is sample dashboard data and will be connected to
        the backend API.
      </div>
    </div>
  );
}

export default Reports;

