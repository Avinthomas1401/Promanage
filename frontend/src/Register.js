import React, { useState } from "react";

function Register(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      
      if (!res.ok) {
        // Handle FastAPI validation errors (422) which return an array of objects
        let errorMsg = "Registration failed";
        if (data.detail) {
          if (typeof data.detail === "string") {
            errorMsg = data.detail;
          } else if (Array.isArray(data.detail)) {
            // Extract 'msg' from each error object and join them
            errorMsg = data.detail.map(err => err.msg).join(", ");
          } else {
            errorMsg = JSON.stringify(data.detail);
          }
        }
        throw new Error(errorMsg);
      }

      // Success
      alert("Registration Successful! Please login.");
      props.onSwitchToLogin(); // Callback to switch view

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-center">
      <div className="card">
        <h2 className="title">Join ProManage</h2>
        <p className="subtitle">Create your account to get started</p>

        {error && <div className="error-msg">{error}</div>}

        <div className="form-group">
          <label className="label">Full Name</label>
          <input
            className="input"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="label">Email Address</label>
          <input
            className="input"
            name="email"
            type="email"
            placeholder="name@company.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="label">Password</label>
          <input
            className="input"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="label">Role</label>
          <select
            className="input"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="member">Member</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button className="btn" onClick={handleRegister} disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem", color: "#64748b" }}>
          Already have an account?{" "}
          <span className="link" onClick={props.onSwitchToLogin}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
