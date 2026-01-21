import React, { useState, useEffect } from "react";
import Tasks from "./Tasks";
import Login from "./Login";
import Home from "./Home";
import About from "./About";
import Projects from "./projects";
import Members from "./Members";
import Register from "./Register";
import ManagerDashboard from "./ManagerDashboard";
import Layout from "./components/Layout";

function App() {

  const [page, setPage] = useState("home");
  const [adminTab, setAdminTab] = useState("dashboard");

  const [name, setName] = useState("Guest");
  const [user, setUser] = useState(null);

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);

  const API = "http://localhost:8000";

  const fetchProjects = () => fetch(API+"/projects/").then(r=>r.json()).then(setProjects);
  const fetchTasks = () => fetch(API+"/tasks/").then(r=>r.json()).then(setTasks);
  const fetchMembers = () => fetch(API+"/members/").then(r=>r.json()).then(setMembers);

  const refreshAll = () => {
    fetchProjects();
    fetchTasks();
    fetchMembers();
  };

  useEffect(()=>{
    if(page==="admin") refreshAll();
  },[page]);

  const logout = () => {
    fetch(API+"/logout/"+user.id,{method:"POST"}).then(()=>{
      setUser(null);
      setName("Guest");
      setPage("home");
    });
  };

  if(page === "register") {
    return <Register onSwitchToLogin={() => setPage("login")} />;
  }

  if(!user || page === "login") {
    return (
      <Login
        setName={setName}
        setPage={setPage}
        setUser={(u)=>{
          setUser(u);
          if(u.role==="admin") setPage("admin");
          else if(u.role==="manager") setPage("manager");
          else setPage("home");
        }}
        onSwitchToRegister={() => setPage("register")}
      />
    );
  }

  if(page === "manager") {
    return <ManagerDashboard />;
  }

  // Admin / Member Layout
  if(page === "admin" || page === "home") {
    return (
      <Layout 
        activeTab={adminTab} 
        setActiveTab={setAdminTab} 
        user={user} 
        logout={logout}
      >
        {adminTab === "dashboard" && (
           <div>
             <h2 className="title" style={{textAlign:"left"}}>Dashboard Overview</h2>
             <div style={{display:"flex", gap:"20px", marginTop:"20px"}}>
                <Card title="Projects" value={projects.length} />
                <Card title="Tasks" value={tasks.length} />
                <Card title="Members" value={members.length} />
             </div>
           </div>
        )}
        
        {adminTab === "tasks" && <Tasks refreshDashboard={refreshAll}/>}
        {adminTab === "projects" && <Projects refreshDashboard={refreshAll}/>}
        {adminTab === "members" && <Members refreshDashboard={refreshAll}/>}
      </Layout>
    );
  }
  
  return null;
}

const Card = ({title,value}) => (
  <div className="card" style={{textAlign:"center", padding: "1.5rem"}}>
    <h3 style={{margin:"0 0 10px 0", color:"#64748b"}}>{title}</h3>
    <h1 style={{margin:0, fontSize:"2.5rem", color:"#4f46e5"}}>{value}</h1>
  </div>
);

export default App;
