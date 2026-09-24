import { useState } from "react";

const services = [
  "Cash Deposit",
  "Cash Withdrawal",
  "Account Opening",
  "Customer Support",
  "Account Inquiry",
];

const branches = [
  "Main Branch",
  "Jaffna Branch",
  "City Branch",
];

function CheckIn() {
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [branch, setBranch] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const number = Math.floor(25 + Math.random() * 70);

    setToken(`A-${number}`);
  };

  const handleNewCheckIn = () => {
    setCustomer("");
    setPhone("");
    setService("");
    setBranch("");
    setToken("");
  };

  return (
    <div className="page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1>Customer Check-In</h1>
          <p>
            Create a virtual queue token for a customer.
          </p>
        </div>
      </div>

      <div className="checkin-layout">

        {/* CHECK-IN FORM */}
        <div className="form-card checkin-form-card">

          <div className="checkin-title">
            <div className="checkin-icon">
              🎟️
            </div>

            <div>
              <h2>New Customer</h2>
              <p>Enter customer details below.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            {/* CUSTOMER NAME */}
            <div className="form-group">
              <label>Customer Name</label>

              <input
                type="text"
                placeholder="Enter customer name"
                value={customer}
                onChange={(e) =>
                  setCustomer(e.target.value)
                }
                required
              />
            </div>

            {/* PHONE */}
            <div className="form-group">
              <label>Phone Number</label>

              <input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                required
              />
            </div>

            {/* SERVICE */}
            <div className="form-group">
              <label>Service</label>

              <select
                value={service}
                onChange={(e) =>
                  setService(e.target.value)
                }
                required
              >
                <option value="">
                  Select a service
                </option>

                {services.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* BRANCH */}
            <div className="form-group">
              <label>Branch</label>

              <select
                value={branch}
                onChange={(e) =>
                  setBranch(e.target.value)
                }
                required
              >
                <option value="">
                  Select a branch
                </option>

                {branches.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* BUTTON */}
            <div className="form-actions">
              <button
                className="primary-button checkin-button"
                type="submit"
              >
                🎟️ Generate Token
              </button>
            </div>

          </form>

        </div>

        {/* INFORMATION CARD */}
        <div className="checkin-info-card">

          <div className="info-icon">
            ⏱️
          </div>

          <h2>How it works</h2>

          <div className="info-step">
            <span>1</span>
            <div>
              <strong>Enter customer details</strong>
              <p>
                Provide the customer's basic information.
              </p>
            </div>
          </div>

          <div className="info-step">
            <span>2</span>
            <div>
              <strong>Select service</strong>
              <p>
                Choose the service the customer needs.
              </p>
            </div>
          </div>

          <div className="info-step">
            <span>3</span>
            <div>
              <strong>Generate token</strong>
              <p>
                A unique virtual queue token is created.
              </p>
            </div>
          </div>

          <div className="info-step">
            <span>4</span>
            <div>
              <strong>Wait for your turn</strong>
              <p>
                Customer can wait without standing in line.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* TOKEN RESULT */}
      {token && (
        <div className="token-card">

          <div className="token-success-icon">
            ✓
          </div>

          <p className="token-label">
            YOUR QUEUE TOKEN
          </p>

          <div className="token-number">
            {token}
          </div>

          <div className="token-details">

            <div>
              <span>Customer</span>
              <strong>{customer}</strong>
            </div>

            <div>
              <span>Service</span>
              <strong>{service}</strong>
            </div>

            <div>
              <span>Branch</span>
              <strong>{branch}</strong>
            </div>

          </div>

          <p className="success-text">
            ✓ Token generated successfully. Please wait until
            your token is called.
          </p>

          <button
            className="secondary-button"
            onClick={handleNewCheckIn}
          >
            + New Check-In
          </button>

        </div>
      )}

    </div>
  );
}

export default CheckIn;