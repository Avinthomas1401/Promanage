import React from "react";

function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "tasks", label: "Tasks", icon: "✅" },
    { id: "projects", label: "Projects", icon: "📁" },
    { id: "members", label: "Members", icon: "👥" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="brand-logo">PM</h2>
        <span className="brand-name">ProManage</span>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`menu-item ${activeTab === item.id ? "active" : ""}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <p>© 2025 ProManage</p>
      </div>
    </div>
  );
}

export default Sidebar;
