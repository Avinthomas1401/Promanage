import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children, activeTab, setActiveTab, user, logout }) {
  return (
    <div className="layout-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="main-wrapper">
        <Navbar user={user} logout={logout} />
        
        <main className="content-area">
          <div className="content-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
