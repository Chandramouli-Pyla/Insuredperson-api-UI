import { useState } from "react";

export default function PolicySearch() {
  const [filters, setFilters] = useState({
    policyNumber: "",
    typeOfInsurance:"",
    firstName: "",
    lastName: "",
    firstChar: "",
    email: "",
    phoneNumber: "",
    userId: "",
  });
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    // Build query params for only filled filters
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value.trim()) {
        params.append(key, value.trim());
      }
    });

    if ([...params].length === 0) {
      setMessage("Please enter at least one filter.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://insuredperson-api-458668609912.us-central1.run.app/api/insuredpersons/policySearch?${params.toString()}`,
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
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="mb-4 text-xl font-bold text-primary border-b pb-2 text-center">
        Search Policies
      </h2>

      {/* Filters Form */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4"  style={{ maxWidth: "1000px" }}>
        <input
          type="text"
          name="policyNumber"
          placeholder="Policy Number"
          value={filters.policyNumber}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />

        <input
          type="text"
          name="typeOfInsurance"
          placeholder="Type of Insurance"
          value={filters.typeOfInsurance}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={filters.firstName}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={filters.lastName}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="firstChar"
          placeholder="First Character of First Name"
          value={filters.firstChar}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={filters.email}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={filters.phoneNumber}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          value={filters.userId}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />

        <div className="sm:col-span-2 flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
          >
            Search
          </button>
        </div>
      </form>

      {/* Message */}
      {message && (
        <p className="mb-3 text-sm text-gray-700 bg-gray-100 p-2 rounded">
          {message}
        </p>
      )}

      {/* Results Table */}
      {results.length > 0 && (
        <div className="overflow-x-auto mt-4" >
          <table className="table-auto w-full border border-gray-200 rounded shadow">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">Policy Number</th>
                <th className="px-4 py-2">Policy Type</th>
                <th className="px-4 py-2">Age</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 -y-2">Address</th>
              </tr>
            </thead>
            <tbody>
              {results.map((person) => (
                <tr
                  key={person.policyNumber || person.userId}
                  className="odd:bg-white even:bg-gray-50"
                >
                  <td className="border px-4 py-2">{person.firstName}</td>
                  <td className="border px-4 py-2">{person.lastName}</td>
                  <td className="border px-4 py-2">{person.policyNumber}</td>
                  <td className="border px-4 py-2">{person.age}</td>
                  <td className="border px-4 py-2">{person.email}</td>
                  <td className="border px-4 py-2">{person.phoneNumber}</td>
                  <td className="border px-4 py-2">{person.userId}</td>
                  <td className="border px-4 py-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                      {person.role}
                    </span>
                  </td>
                  <td className="border px-4 py-2">
                      {[person?.street ? `${person.street} St`:null, person?.apartment, person?.city, person?.state, person?.country, person?.zipcode]
                      .filter(Boolean)
                      .join(", ")}
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
