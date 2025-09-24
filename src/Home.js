import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1])); 
      const policyNumber = payload.sub; // subject = policyNumber in backend

      fetch(`https://insuredperson-api-458668609912.us-central1.run.app/api/insuredpersons/${policyNumber}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
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
    navigate("/"); // redirect back to login
  }

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <h2>PCM Insurance Ltd.</h2>
        <div className="user-info">
          <span>👤 {user?.firstName || "User"}</span>
          <span>📑 Policy: {user?.policyNumber || "N/A"}</span>
        </div>
      </header>

      {/* Main layout */}
      <div className="main">
        {/* Sidebar Navigation */}
        <div className="sidebar">
          <Link to="welcome">
            <button>Profile</button>
          </Link>
          <Link to="create">
            <button>Register Policy Holder</button>
          </Link>
          <Link to="policyNumber">
            <button>Policy Search</button>
          </Link>
          <Link to="update">
            <button>Update Details</button>
          </Link>
          <Link to="all">
            <button>Insured Directory</button>
          </Link>
          <Link to="firstName">
            <button>First Name Lookup</button>
          </Link>
          <Link to="lastName">
            <button>Last Name Lookup</button>
          </Link>
          <Link to="firstChar">
            <button>By Initial</button>
          </Link>
          <Link to="delete">
            <button>Remove User</button>
          </Link>
          <Link to="changePassword">
            <button>Change Password</button>
          </Link>
          <button className="logout" onClick={logout}>
            Logout
          </button>
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
