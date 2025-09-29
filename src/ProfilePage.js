import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [fieldValue, setFieldValue] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");

  // Extract policyNumber from JWT token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setPolicyNumber(decoded.sub);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  // Fetch profile
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (policyNumber && token) {
      fetch(`https://insuredperson-api-458668609912.us-central1.run.app/api/insuredpersons/${policyNumber}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(res => {
          if (!res.ok) throw new Error("Unauthorized");
          return res.json();
        })
        .then(data => setProfile(data.data || data))
        .catch(err => console.error("Error fetching profile:", err));
    }
  }, [policyNumber]);

  // Save field updates
  const handleSave = async (field) => {
    try {
      const token = localStorage.getItem("token");
      const body = { [field]: fieldValue };

      const response = await fetch(
        `https://insuredperson-api-458668609912.us-central1.run.app/api/insuredpersons/${policyNumber}`,
        {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) throw new Error("Update failed");

      const updated = await response.json();
      setProfile(updated.data || updated);
      setEditingField(null);
    } catch (err) {
      console.error(err);
      alert("Error updating field");
    }
  };

  if (!profile) return <p style={styles.loading}>Loading...</p>;

  const renderField = (label, field) => (
    <div style={styles.row}>
      <strong style={styles.label}>{label}:</strong>
      {editingField === field ? (
        <>
          <input
            style={styles.input}
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
          />
          <button onClick={() => handleSave(field)} style={styles.okBtn}>
            ✅
          </button>
          <button onClick={() => setEditingField(null)} style={styles.cancelBtn}>
            ❌
          </button>
        </>
      ) : (
        <>
          <span style={styles.value}>{profile[field] || "-"}</span>
          <button
            onClick={() => {
              setEditingField(field);
              setFieldValue(profile[field] || "");
            }}
            style={styles.editBtn}
          >
            ✏️
          </button>
        </>
      )}
    </div>
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Profile Details</h2>
      <div style={styles.card}>
        {renderField("First Name", "firstName")}
        {renderField("Last Name", "lastName")}
        {renderField("Age", "age")}
        {renderField("Email", "email")}
        {renderField("Phone Number", "phoneNumber")}
        {renderField("Street", "street")}
        {renderField("Apartment", "apartment")}
        {renderField("City", "city")}
        {renderField("State", "state")}
        {renderField("Country", "country")}
        {renderField("Zip Code", "zipcode")}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "30px auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "0 15px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#2c3e50",
    fontSize: "28px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "12px 0",
    padding: "8px 12px",
    borderRadius: "8px",
    transition: "background 0.2s",
  },
  label: {
    width: "150px",
    color: "#34495e",
    fontWeight: 500,
  },
  value: {
    flexGrow: 1,
    marginLeft: "10px",
    color: "#2c3e50",
  },
  input: {
    flexGrow: 1,
    marginLeft: "10px",
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  editBtn: {
    marginLeft: "10px",
    cursor: "pointer",
    background: "#3498db",
    border: "none",
    color: "#fff",
    borderRadius: "6px",
    padding: "4px 8px",
    transition: "background 0.2s",
  },
  okBtn: {
    marginLeft: "10px",
    cursor: "pointer",
    background: "#2ecc71",
    border: "none",
    color: "#fff",
    borderRadius: "6px",
    padding: "4px 8px",
    transition: "background 0.2s",
  },
  cancelBtn: {
    marginLeft: "5px",
    cursor: "pointer",
    background: "#e74c3c",
    border: "none",
    color: "#fff",
    borderRadius: "6px",
    padding: "4px 8px",
    transition: "background 0.2s",
  },
  loading: {
    textAlign: "center",
    fontSize: "20px",
    color: "#7f8c8d",
    marginTop: "50px",
  },
};
