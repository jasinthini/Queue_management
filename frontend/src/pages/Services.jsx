
import { useState } from "react";

const initialServices = [
  {
    id: 1,
    name: "Account Opening",
    description: "Open a new bank account",
    estimatedTime: 15,
    status: "Active",
  },
  {
    id: 2,
    name: "Cash Deposit",
    description: "Deposit cash into an account",
    estimatedTime: 5,
    status: "Active",
  },
  {
    id: 3,
    name: "Cash Withdrawal",
    description: "Withdraw cash from an account",
    estimatedTime: 5,
    status: "Active",
  },
  {
    id: 4,
    name: "Customer Support",
    description: "General customer assistance",
    estimatedTime: 10,
    status: "Active",
  },
  {
    id: 5,
    name: "Account Inquiry",
    description: "Account related information",
    estimatedTime: 8,
    status: "Inactive",
  },
];

function Services() {
  const [services, setServices] = useState(initialServices);

  const toggleStatus = (id) => {
    setServices((items) =>
      items.map((service) =>
        service.id === id
          ? {
              ...service,
              status:
                service.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : service
      )
    );
  };

  const activeCount = services.filter(
    (service) => service.status === "Active"
  ).length;

  const inactiveCount = services.filter(
    (service) => service.status === "Inactive"
  ).length;

  return (
    <div className="page">
      {/* Page Header */}

      <div className="page-header">
        <div>
          <h1>Services</h1>
          <p>
            Manage the services available in your organisation.
          </p>
        </div>

        <button className="btn btn-primary px-4">
          + Add Service
        </button>
      </div>

      {/* Statistics */}

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-secondary mb-2">
                Total Services
              </p>

              <h2 className="fw-bold text-dark mb-1">
                {services.length}
              </h2>

              <small className="text-secondary">
                Services configured
              </small>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-secondary mb-2">
                Active Services
              </p>

              <h2 className="fw-bold mb-1 text-success">
                {activeCount}
              </h2>

              <small className="text-secondary">
                Currently available
              </small>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-secondary mb-2">
                Inactive Services
              </p>

              <h2 className="fw-bold mb-1 text-secondary">
                {inactiveCount}
              </h2>

              <small className="text-secondary">
                Currently unavailable
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Services Table */}

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="p-4 border-bottom">
            <h5 className="fw-bold mb-1">
              Available Services
            </h5>

            <p className="text-secondary small mb-0">
              View and manage organisation services.
            </p>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4">Service</th>
                  <th>Description</th>
                  <th>Estimated Time</th>
                  <th>Status</th>
                  <th className="text-end px-4">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {services.map((service) => (
                  <tr key={service.id}>
                    <td className="px-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="service-icon">
                          ⚙️
                        </div>

                        <strong className="text-dark">
                          {service.name}
                        </strong>
                      </div>
                    </td>

                    <td className="text-secondary">
                      {service.description}
                    </td>

                    <td>
                      <span className="text-dark fw-semibold">
                        {service.estimatedTime} min
                      </span>
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          service.status === "Active"
                            ? "text-bg-success"
                            : "text-bg-secondary"
                        }`}
                      >
                        {service.status}
                      </span>
                    </td>

                    <td className="text-end px-4">
                      <button
                        className={`btn btn-sm ${
                          service.status === "Active"
                            ? "btn-outline-danger"
                            : "btn-outline-success"
                        }`}
                        onClick={() =>
                          toggleStatus(service.id)
                        }
                      >
                        {service.status === "Active"
                          ? "Deactivate"
                          : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
