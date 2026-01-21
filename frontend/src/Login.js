import React, { useState } from "react";

function Login(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin() {
    setError("");
    setLoading(true);

    fetch("http://localhost:8000/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email.trim(),
        password: password.trim(),
        role: role.toLowerCase().trim()
      })
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) {
           let errorMsg = "Invalid credentials";
           if(data.detail){
             if(typeof data.detail === "string") errorMsg = data.detail;
             else if(Array.isArray(data.detail)) errorMsg = data.detail.map(e=>e.msg).join(", ");
             else errorMsg = JSON.stringify(data.detail);
           }
           throw new Error(errorMsg);
        }
        return data;
      })
      .then(data => {
        console.log("LOGIN SUCCESS:", data);

        props.setName(data.name);
        props.setUser(data);

        // 🔥 ROLE BASED REDIRECT
        if (data.role === "admin") {
          props.setPage("admin");
        } 
        else if (data.role === "manager") {
          props.setPage("manager");
        }
        else {
          props.setPage("home");
        }
      })
      .catch(err => {
        console.log("LOGIN ERROR:", err.message);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="container-center">
      <div className="card">
        <h2 className="title">Welcome Back</h2>
        <p className="subtitle">Enter your credentials to access your account</p>

        {error && <div className="error-msg">{error}</div>}

        <div className="form-group">
          <label className="label">Email Address</label>
          <input
            className="input"
            placeholder="name@company.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="label">Role</label>
          <select
            className="input"
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="member">Member</option>
          </select>
        </div>

        <button className="btn" onClick={handleLogin} disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem", color: "#64748b" }}>
          Don't have an account?{" "}
          <span className="link" onClick={props.onSwitchToRegister}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
