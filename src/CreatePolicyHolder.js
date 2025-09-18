import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePolicyHolder() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    policyNumber: "",
    userId: "",
    password: "",
    role: "User",
    email: ""
  });

  const [message, setMessage] = useState("");
  const [createdUser, setCreatedUser] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/api/insuredpersons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, age: parseInt(formData.age, 10) })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "Policy created successfully!");
        setCreatedUser(data.data);
        setShowForm(false);
      } else {
        setMessage(data.message || "Failed to create policy.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    }
  };

  const handleCreateAnother = () => {
    setFormData({
      firstName: "",
      lastName: "",
      age: "",
      policyNumber: "",
      userId: "",
      password: "",
      role: "User",
      email: ""
    });
    setCreatedUser(null);
    setMessage("");
    setShowForm(true);
  };

  const handleGoToProfile = () => {
    navigate("/home/welcome");
  };

  return (
    <div className="card shadow-sm p-4 bg-white mx-auto" style={{ maxWidth: "80%" }}>
      <h3 className="text-center text-primary mb-4">Create Insured Person</h3>

      {showForm ? (
        <form
          onSubmit={handleCreate}
          className="d-flex flex-column justify-content-between">
          <div className="flex-grow-1 d-flex flex-column justify-content-evenly">
            <div>
              <label className="form-label">First Name</label>
              <input className="form-control" type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>

            <div>
              <label className="form-label">Last Name</label>
              <input className="form-control" type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>

            <div>
              <label className="form-label">Age</label>
              <input className="form-control" type="number" name="age" value={formData.age} onChange={handleChange} required />
            </div>

            <div>
              <label className="form-label">Policy Number</label>
              <input className="form-control" type="text" name="policyNumber" value={formData.policyNumber} onChange={handleChange} required />
            </div>

            <div>
              <label className="form-label">User ID</label>
              <input className="form-control" type="text" name="userId" value={formData.userId} onChange={handleChange} required />
            </div>

            <div>
              <label className="form-label">Password</label>
              <input className="form-control" type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>

            <div>
              <label className="form-label">Email</label>
              <input className="form-control" type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div>
              <label className="form-label">Role</label>
              <select className="form-select" name="role" value={formData.role} onChange={handleChange}>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Create User
          </button>
        </form>
      ) : (
        <div className="text-center">
          <div className="alert alert-success">{message}</div>

          {createdUser && (
            <div className="text-start mt-3">
              <h5>Created User Details</h5>
              <p><b>Name:</b> {createdUser.firstName} {createdUser.lastName}</p>
              <p><b>Policy Number:</b> {createdUser.policyNumber}</p>
              <p><b>Email:</b> {createdUser.email}</p>
              <p><b>Role:</b> {createdUser.role}</p>
            </div>
          )}

          <div className="mt-4">
            <p>Do you want to create another policy holder?</p>
            <button className="btn btn-primary me-2" onClick={handleCreateAnother}>Yes</button>
            <button className="btn btn-secondary" onClick={handleGoToProfile}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}
