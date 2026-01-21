import React from "react";

function Navbar({ user, logout }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <h2 className="navbar-title">Admin Console</h2>
      </div>

      <div className="navbar-right">
        <div className="user-profile">
          <div className="avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="user-info">
            <p className="user-name">{user?.name || "Guest"}</p>
            <p className="user-role">{user?.role || "Visitor"}</p>
          </div>
        </div>
        
        <button className="btn-logout" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
