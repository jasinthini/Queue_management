
import { useState } from "react";

function Organizations() {
  const [editing, setEditing] = useState(false);

  const [organization, setOrganization] = useState({
    name: "QueueFlow Service Centre",
    description:
      "Digital queue management platform for modern customer service organisations.",
    industry: "Customer Services",
    branches: 3,
    counters: 19,
    dailyCustomers: "250+",
  });

  const [formData, setFormData] = useState(organization);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setOrganization(formData);
    setEditing(false);
  };

  const handleCancel = () => {
    setFormData(organization);
    setEditing(false);
  };

  return (
    <div className="page">
      {/* Header */}

      <div className="page-header">
        <div>
          <h1>Organization</h1>
          <p>
            Manage your organisation information and settings.
          </p>
        </div>

        {!editing && (
          <button
            className="btn btn-primary px-4"
            onClick={() => setEditing(true)}
          >
            ✏️ Edit Organization
          </button>
        )}
      </div>

      {/* Organization Card */}

      <div className="card border-0 shadow-sm organization-main-card">
        <div className="card-body p-4 p-md-5">
          {!editing ? (
            <>
              <div className="d-flex align-items-start gap-4 flex-wrap">
                <div className="organization-logo">
                  Q
                </div>

                <div className="flex-grow-1">
                  <div className="d-flex align-items-center gap-3 flex-wrap mb-2">
                    <h2 className="fw-bold text-dark mb-0">
                      {organization.name}
                    </h2>

                    <span className="badge text-bg-success">
                      Active
                    </span>
                  </div>

                  <p className="text-secondary mb-4">
                    {organization.description}
                  </p>

                  {/* Details */}

                  <div className="row g-3">
                    <div className="col-sm-6 col-lg-3">
                      <div className="organization-detail">
                        <span>Industry</span>
                        <strong>
                          {organization.industry}
                        </strong>
                      </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                      <div className="organization-detail">
                        <span>Branches</span>
                        <strong>
                          {organization.branches}
                        </strong>
                      </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                      <div className="organization-detail">
                        <span>Counters</span>
                        <strong>
                          {organization.counters}
                        </strong>
                      </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                      <div className="organization-detail">
                        <span>Daily Customers</span>
                        <strong>
                          {organization.dailyCustomers}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Organization Features */}

              <hr className="my-4" />

              <h5 className="fw-bold mb-3">
                System Overview
              </h5>

              <div className="row g-3">
                <div className="col-md-4">
                  <div className="overview-box">
                    <div className="overview-icon">
                      🏢
                    </div>

                    <div>
                      <strong>Multi-Branch</strong>
                      <p>
                        Manage multiple service locations.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="overview-box">
                    <div className="overview-icon">
                      🖥️
                    </div>

                    <div>
                      <strong>Multi-Counter</strong>
                      <p>
                        Manage customer queues across counters.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="overview-box">
                    <div className="overview-icon">
                      🎟️
                    </div>

                    <div>
                      <strong>Virtual Queue</strong>
                      <p>
                        Customers receive digital queue tokens.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Edit Form */

            <div>
              <h4 className="fw-bold text-dark mb-4">
                Edit Organization
              </h4>

              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Organization Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Industry
                  </label>

                  <input
                    type="text"
                    name="industry"
                    className="form-control"
                    value={formData.industry}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">
                    Description
                  </label>

                  <textarea
                    name="description"
                    className="form-control"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="d-flex gap-2 mt-4">
                <button
                  className="btn btn-primary px-4"
                  onClick={handleSave}
                >
                  Save Changes
                </button>

                <button
                  className="btn btn-outline-secondary px-4"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Organizations;

