import { useState } from "react";

export default function DeleteInsuredPerson() {
  const [policyNumber, setPolicyNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async (e) => {
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
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Insured Person deleted successfully");
        setPolicyNumber("");
      } else {
        setMessage(data.message || "Failed to delete insured person");
      }
    } catch (err) {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow mt-20">
      <h2 className="mb-4 text-xl fw-bold text-primary border-bottom pb-2 text-center">
        Delete Insured Person
      </h2>

      {/* Delete Form */}
      <form onSubmit={handleDelete} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">
            Policy Number:
          </label>
          <input
            type="text"
            value={policyNumber}
            onChange={(e) => setPolicyNumber(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-red-400"
            placeholder="Enter Policy Number"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded shadow"
        >
          Delete
        </button>
      </form>

      {/* Message */}
      {message && (
        <p
          className={`mt-4 text-center font-medium p-2 rounded ${
            message.includes("successfully")
              ? "text-green-700 bg-green-100"
              : "text-red-700 bg-red-100"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
