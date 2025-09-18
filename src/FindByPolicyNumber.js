import { useState } from "react";

export default function FindByPolicyNumber() {
  const [policyNumber, setPolicyNumber] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8081/api/insuredpersons/${policyNumber}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setResults([data.data]);
        setMessage(data.message);
      } else {
        setResults([]);
        setMessage(data.message || "Unauthorized");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="p-4 d-flex flex-column align-items-center">
      <h2 className="mb-4 text-xl fw-bold text-primary border-bottom pb-2 text-center">
        Search Policy Holder by Policy Number
      </h2>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="d-flex gap-2 mb-3 w-100"
        style={{ maxWidth: "500px" }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Enter Policy Number"
          value={policyNumber}
          onChange={(e) => setPolicyNumber(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {/* Message */}
      {message && (
        <p className="mb-3 text-sm text-gray-700 bg-light p-2 rounded w-100 text-center" style={{ maxWidth: "500px" }}>
          {message}
        </p>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="table-responsive w-100" style={{ maxWidth: "900px" }}>
          <table className="table table-striped table-hover align-middle shadow-sm rounded">
            <thead className="table-dark">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Policy Number</th>
                <th>Age</th>
                <th>Email</th>
                <th>User ID</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {results.map((person) => (
                <tr key={person.policyNumber}>
                  <td>{person.firstName}</td>
                  <td>{person.lastName}</td>
                  <td>{person.policyNumber}</td>
                  <td>{person.age}</td>
                  <td>{person.email}</td>
                  <td>{person.userId}</td>
                  <td>
                    <span className="badge bg-primary">{person.role}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
