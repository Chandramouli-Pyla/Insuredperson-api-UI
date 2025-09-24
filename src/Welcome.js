import { useEffect, useState } from "react";

export default function Welcome() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("No token found, please login.");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1])); 
      const policyNumber = payload.sub;

      fetch(`https://insuredperson-api-458668609912.us-central1.run.app/api/insuredpersons/${policyNumber}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
        .then(async (res) => {
          const data = await res.json();
          if (res.ok) {
            setUser(data.data);
            setMessage(data.message);
          } else {
            setMessage(data.message || "Unauthorized");
          }
        })
        .catch(() => setMessage("Something went wrong"));
    } catch (err) {
      setMessage("Invalid token");
    }
  }, []);

  if (message && !user) {
    return (
      <div className="p-4 text-center">
        <p className="text-danger fw-bold">{message}</p>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center p-4 mt-20">
      <div className="card shadow-lg w-200" style={{ maxWidth: "700px"}}>
        <div className="card-body text-center">
          <h1 className="card-title mb-3 text-primary fw-bold">
            Welcome, {user?.firstName} {user?.lastName}!
          </h1>
          <h5 className="card-subtitle mb-4 text-muted">
            Here are your details:
          </h5>
          <ul className="list-group list-group-flush text-start">
            <li className="list-group-item">
              <strong>Policy Number:</strong> {user?.policyNumber}
            </li>
            <li className="list-group-item">
              <strong>Email:</strong> {user?.email}
            </li>
            <li className="list-group-item">
              <strong>Role:</strong>{" "}
              <span className="badge bg-success" style={{width:"50px"}}>{user?.role}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
