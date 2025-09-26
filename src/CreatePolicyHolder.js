import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePolicyHolder() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    policyNumber: "",
    typeOfInsurance: "",
    userId: "",
    password: "",
    role: "User",
    email: "",
    phoneNumber: "",
    street: "",
    apartment: "",
    city: "",
    zipcode: "",
    state: "",
    country: ""
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [createdUser, setCreatedUser] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    // UserId validation
    const userIdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!$*_])[A-Za-z\d@!$*_]{8,}$/;
    if (!formData.userId || !userIdRegex.test(formData.userId)) {
      newErrors.userId =
        "UserId must be at least 8 characters long and contain one uppercase, one lowercase, one digit, and one special character (@!$*_)";
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!$*_])[A-Za-z\d@!$*_]{8,}$/;
    if (!formData.password || !passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and contain one uppercase, one lowercase, one digit, and one special character (@!$*_)";
    }

    // Policy Number validation
    if (!formData.policyNumber || !formData.policyNumber.startsWith("PA")) {
      newErrors.policyNumber = "Policy Number must start with 'PA'";
    }

    // Email validation
    const emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Email id format is invalid";
    }

    // First Name & Last Name
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";

    // Age
    if (!formData.age || isNaN(formData.age) || formData.age < 18 || formData.age > 100) {
      newErrors.age = "Age must be a number between 18 and 100";
    }

    // Phone Number
    const phoneRegex = /^[2-9][0-9]{9}$/;
    if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits and start with digits 2-9";
    }

    // Zipcode
    const zipRegex = /^[0-9]{5}$/;
    if (!formData.zipcode || !zipRegex.test(formData.zipcode)) {
      newErrors.zipcode = "Zip code must be exactly 5 digits";
    }

    // Type of Insurance
    if (!formData.typeOfInsurance) {
      newErrors.typeOfInsurance = "Type of Insurance is required";
    }

    // Address fields
    if (!formData.street.trim()) newErrors.street = "Street is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("https://insuredperson-api-458668609912.us-central1.run.app/api/insuredpersons", {
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
      typeOfInsurance: "",
      userId: "",
      password: "",
      role: "User",
      email: "",
      phoneNumber: "",
      street: "",
      apartment: "",
      city: "",
      zipcode: "",
      state: "",
      country: ""
    });
    setErrors({});
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
        <form onSubmit={handleCreate} className="d-flex flex-column justify-content-between">
          <div className="flex-grow-1 d-flex flex-column justify-content-evenly">

            {/* First Name */}
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
            </div>

            {/* Last Name */}
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
            </div>

            {/* Age */}
            <div className="mb-3">
              <label className="form-label">Age</label>
              <input
                className={`form-control ${errors.age ? "is-invalid" : ""}`}
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
              {errors.age && <div className="invalid-feedback">{errors.age}</div>}
            </div>

            {/* Policy Number */}
            <div className="mb-3">
              <label className="form-label">Policy Number</label>
              <input
                className={`form-control ${errors.policyNumber ? "is-invalid" : ""}`}
                type="text"
                name="policyNumber"
                value={formData.policyNumber}
                onChange={handleChange}
                required
              />
              {errors.policyNumber && <div className="invalid-feedback">{errors.policyNumber}</div>}
            </div>

            {/* Type of Insurance */}
            <div className="mb-3">
              <label className="form-label">Type of Insurance</label>
              <select
                className={`form-select ${errors.typeOfInsurance ? "is-invalid" : ""}`}
                name="typeOfInsurance"
                value={formData.typeOfInsurance}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="HEALTH">Health</option>
                <option value="LIFE">Life</option>
                <option value="AUTO">Auto</option>
                <option value="HOME">Home</option>
                <option value="TRAVEL">Travel</option>
              </select>
              {errors.typeOfInsurance && <div className="invalid-feedback">{errors.typeOfInsurance}</div>}
            </div>

            {/* Phone Number */}
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
            </div>

            {/* Street */}
            <div className="mb-3">
              <label className="form-label">Street</label>
              <input
                className={`form-control ${errors.street ? "is-invalid" : ""}`}
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
              />
              {errors.street && <div className="invalid-feedback">{errors.street}</div>}
            </div>

            {/* Apartment */}
            <div className="mb-3">
              <label className="form-label">Apartment</label>
              <input
                className="form-control"
                type="text"
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
              />
            </div>

            {/* City */}
            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                className={`form-control ${errors.city ? "is-invalid" : ""}`}
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
              {errors.city && <div className="invalid-feedback">{errors.city}</div>}
            </div>

            {/* State */}
            <div className="mb-3">
              <label className="form-label">State</label>
              <input
                className={`form-control ${errors.state ? "is-invalid" : ""}`}
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
              {errors.state && <div className="invalid-feedback">{errors.state}</div>}
            </div>

            {/* Country */}
            <div className="mb-3">
              <label className="form-label">Country</label>
              <input
                className={`form-control ${errors.country ? "is-invalid" : ""}`}
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
              {errors.country && <div className="invalid-feedback">{errors.country}</div>}
            </div>

            {/* Zipcode */}
            <div className="mb-3">
              <label className="form-label">Zipcode</label>
              <input
                className={`form-control ${errors.zipcode ? "is-invalid" : ""}`}
                type="text"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                required
              />
              {errors.zipcode && <div className="invalid-feedback">{errors.zipcode}</div>}
            </div>

            {/* User ID */}
            <div className="mb-3">
              <label className="form-label">User ID</label>
              <input
                className={`form-control ${errors.userId ? "is-invalid" : ""}`}
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                required
              />
              {errors.userId && <div className="invalid-feedback">{errors.userId}</div>}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            {/* Role */}
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
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
