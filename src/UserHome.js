import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css";

export default function AdminHome() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true); // toggle state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const policyNumber = payload.sub;

      fetch(`https://insuredperson-api-458668609912.us-central1.run.app/api/insuredpersons/${policyNumber}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          const data = await res.json();
          if (res.ok) {
            setUser(data.data);
          }
        })
        .catch(() => console.error("Error fetching user profile"));
    } catch (err) {
      console.error("Invalid token", err);
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <h3>PCM Insurance Ltd.</h3>
        <div className="user-info">
          <span>👤 {user?.firstName || "User"}</span>
          <span>📑 Policy: {user?.policyNumber || "N/A"}</span>
        </div>
      </header>

      {/* Main layout */}
      <div className="main">
        {/* Sidebar Navigation */}
        <div className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
          {/* Toggle button inside sidebar */}
          <button
            className="menu-toggle-inside"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "✖" : "☰"}
          </button>

        
          {sidebarOpen && (
            <div
              className="sidebar-links"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                marginTop: "40px",
              }}
            >
              {/* Top buttons */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "40px",
                }}
              >
                <Link to="welcome">
                  <button>Profile</button>
                </Link>
                <Link to="policyNumber">
                  <button>Policy Details</button>
                </Link>
                <Link to="policySearch">
                  <button>Policy Search</button>
                </Link>
                <Link to="changePassword">
                  <button>Change Password</button>
                </Link>
              </div>

              {/* Logout at bottom */}
              <button className="logout" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="content">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} PCM Insurance Ltd. All Rights Reserved.
      </footer>
    </div>
  );
}