import { useState } from "react";

export default function FindByFirstName() {
  const [firstName, setFirstName] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8081/api/insuredpersons/findByFirstName?firstName=${firstName}`,
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
        setResults(data.data);
        setMessage(data.message);
      } else {
        setResults([]);
        setMessage(data.message || "Unauthorized");
      }
    } catch (error) {
      console.error(error);
      setResults([]);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="p-4 text-center">
      <h2 className="mb-4 text-xl fw-bold text-primary border-bottom pb-2 text-center">
        Search Policy Holders by First Name
      </h2>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex gap-2 justify-center mb-3 max-w-md mx-auto"
      >
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
          placeholder="Enter First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow"
        >
          Search
        </button>
      </form>

      {/* Message */}
      {message && (
        <p className="mb-3 text-sm text-gray-700 bg-gray-100 p-2 rounded">
          {message}
        </p>
      )}

      {/* Results Table */}
      {results.length > 0 && (
        <div className="overflow-x-auto mt-4">
          <table className="table-auto w-full border border-gray-200 rounded shadow">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">Policy Number</th>
                <th className="px-4 py-2">Age</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {results.map((person) => (
                <tr key={person.policyNumber} className="odd:bg-white even:bg-gray-50">
                  <td className="border px-4 py-2">{person.firstName}</td>
                  <td className="border px-4 py-2">{person.lastName}</td>
                  <td className="border px-4 py-2">{person.policyNumber}</td>
                  <td className="border px-4 py-2">{person.age}</td>
                  <td className="border px-4 py-2">{person.email}</td>
                  <td className="border px-4 py-2">{person.userId}</td>
                  <td className="border px-4 py-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                      {person.role}
                    </span>
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

