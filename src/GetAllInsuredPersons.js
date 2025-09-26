import { useState, useEffect } from "react";

export default function GetAllInsuredPersons() {
  const [insuredPersons, setInsuredPersons] = useState([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(0); // still zero-based
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `https://insuredperson-api-458668609912.us-central1.run.app/api/insuredpersons?offSet=${page}&pageSize=3`,
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
          setInsuredPersons(data.data);
          setMessage(data.message);
          setHasNext(data.hasNext);
          setHasPrevious(data.hasPrevious);
          setTotalPages(data.totalPages); // 👈 comes from backend
        } else {
          setMessage(data.message || "Unauthorized");
        }
      } catch (error) {
        console.error(error);
        setMessage("Something went wrong");
      }
    };

    fetchAll();
  }, [page]);

  return (
    <div className="p-4">
      <h2 className="mb-3 text-xl font-bold text-gray-800 border-b pb-2">
        All Insured Persons
      </h2>

      {message && (
        <p className="mb-3 text-sm text-gray-700 bg-gray-100 p-2 rounded">
          {message}
        </p>
      )}

      {insuredPersons.length > 0 ? (
        <>
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle shadow-sm rounded">
              <thead className="table-dark">
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Policy Number</th>
                  <th>Policy Type</th>
                  <th>Age</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>User ID</th>
                  <th>Role</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {insuredPersons.map((person) => (
                  <tr key={person.policyNumber}>
                    <td>{person.firstName}</td>
                    <td>{person.lastName}</td>
                    <td>{person.policyNumber}</td>
                    <td>{person.typeOfInsurance}</td>
                    <td>{person.age}</td>
                    <td>{person.email}</td>
                    <td>{person.phoneNumber}</td>
                    <td>{person.userId}</td>
                    <td>
                      <span
                        className="badge bg-primary"
                        style={{ width: "50px" }}
                      >
                        {person.role}
                      </span>
                    </td>
                    <td>
                      {[person?.street ? `${person.street} St`:null, person?.apartment, person?.city, person?.state, person?.country, person?.zipcode]
                      .filter(Boolean) // remove null or undefined parts
                      .join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col items-center gap-3 mt-4">
            {/* Page Numbers */}
            <div className="flex gap-2">
              {[...Array(totalPages).keys()].map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 rounded ${
                    page === p
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {p + 1}
                </button>
              ))}
            </div>

            {/* Dropdown for direct page select */}
            <div>
              <select
                value={page}
                onChange={(e) => setPage(Number(e.target.value))}
                className="px-2 py-1 border rounded"
              >
                {[...Array(totalPages).keys()].map((p) => (
                  <option key={p} value={p}>
                    Page {p + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* Prev / Next */}
            <div className="flex gap-3">
              <button
                disabled={!hasPrevious}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>

              <button
                disabled={!hasNext}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <p className="text-muted">No insured persons found.</p>
      )}
    </div>
  );
}

