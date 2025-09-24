import { useState } from "react";

export default function UpdateInsuredPerson() {
  const [policyNumber, setPolicyNumber] = useState("");
  const [selectedFields, setSelectedFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");

  const fields = [
    { label: "First Name", name: "firstName" },
    { label: "Last Name", name: "lastName" },
    { label: "Age", name: "age" },
    { label: "Email", name: "email" },
    { label: "Role", name: "role" },
    { label: "User Id", name: "userId" },
  ];

  // Handle checkbox selection
  const handleFieldSelection = (e) => {
    const { value, checked } = e.target;
    setSelectedFields((prev) =>
      checked ? [...prev, value] : prev.filter((f) => f !== value)
    );
    setFormData((prev) => {
      const updated = { ...prev };
      if (!checked) delete updated[value];
      return updated;
    });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? parseInt(value, 10) : value,
    }));
  };

  // Submit PATCH request
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!policyNumber) {
      setMessage("Please enter a Policy Number.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://insuredperson-api-458668609912.us-central1.run.app/api/insuredpersons/${policyNumber}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Insured Person updated successfully!");
        setSelectedFields([]);
        setFormData({});
        setPolicyNumber("");
      } else {
        setMessage(data.message || "Failed to update insured person.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        Update Insured Person
      </h2>

      {/* Policy Number Input */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Policy Number
        </label>
        <input
          type="text"
          value={policyNumber}
          onChange={(e) => setPolicyNumber(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Field Selection */}
      <div className="mb-4">
        <p className="font-medium text-gray-700 mb-2">Select fields to update:</p>
        <div className="grid grid-cols-2 gap-2">
          {fields.map((field) => (
            <label key={field.name} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={field.name}
                checked={selectedFields.includes(field.name)}
                onChange={handleFieldSelection}
                className="w-4 h-4"
              />
              <span>{field.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Dynamic Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {selectedFields.map((fieldName) => {
          const field = fields.find((f) => f.name === fieldName);
          return (
            <div key={field.name}>
              <label className="block text-gray-700 font-medium mb-1">
                {field.label}
              </label>
              <input
                type={field.name === "age" ? "number" : "text"}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
              />
            </div>
          );
        })}

        {selectedFields.length > 0 && (
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md transition"
          >
            Update
          </button>
        )}
      </form>

      {/* Message */}
      {message && (
        <div
          className={`mt-4 p-3 rounded text-sm font-medium ${
            message.includes("Successful")
              ? "bg-green-100 text-green-700 border-l-4 border-green-500"
              : "bg-red-100 text-red-700 border-l-4 border-red-500"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
