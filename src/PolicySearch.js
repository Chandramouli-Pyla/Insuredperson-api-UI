// import { useState, useEffect } from "react";

// export default function PolicySearch() {
//   const [query, setQuery] = useState(""); // single input
//   const [results, setResults] = useState([]);
//   const [message, setMessage] = useState("");

//   // Pagination states
//   const [page, setPage] = useState(0);
//   const [hasNext, setHasNext] = useState(false);
//   const [hasPrevious, setHasPrevious] = useState(false);
//   const [totalPages, setTotalPages] = useState(0);

//     const params = new URLSearchParams();
//   const fields = [
//     "policyNumber",
//     "firstName",
//     "lastName",
//     "firstChar",
//     "email",
//     "phoneNumber",
//     "userId",
//   ];

//   fields.forEach((field) => {
//     params.append(field, query.trim());
//   });

//   // Fetch all records when query is empty
//   useEffect(() => {
//     if (query.trim()) return; // skip auto fetch when searching
//     fetchAll();
//   }, [page, query]);

//   const fetchAll = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         `https://insuredperson-api-458668609912.us-central1.run.app/api/insuredpersons?offSet=${page}&pageSize=5`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const data = await response.json();
//       if (response.ok) {
//         setResults(data.data);
//         setMessage(data.message);
//         setHasNext(data.hasNext);
//         setHasPrevious(data.hasPrevious);
//         setTotalPages(data.totalPages);
//       } else {
//         setResults([]);
//         setMessage(data.message || "Unauthorized");
//       }
//     } catch (error) {
//       console.error(error);
//       setResults([]);
//       setMessage("Something went wrong");
//     }
//   };

//   console.log(query);
//   const handleSearch = async (e) => {
//     e.preventDefault();

//     if (!query.trim()) {
//       setPage(0);
//       fetchAll();
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//           `https://insuredperson-api-458668609912.us-central1.run.app/api/insuredpersons/policySearch?query=${encodeURIComponent(query)}`,

//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const data = await response.json();
//       if (response.ok) {
//         setResults(data.data);
//         setMessage(data.message);
//         // disable pagination while filtering
//         setHasNext(false);
//         setHasPrevious(false);
//         setTotalPages(1);
//       } else {
//         setResults([]);
//         setMessage(data.message || "Unauthorized");
//       }
//     } catch (error) {
//       console.error(error);
//       setResults([]);
//       setMessage("Something went wrong");
//     }
//   };

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-primary border-b pb-2">
//           Insured Persons
//         </h2>

//         {/* Single search input */}
//         <form onSubmit={handleSearch} className="flex gap-2">
//           <input
//             type="text"
//             placeholder="Search by any field..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="border rounded px-3 py-1 w-64"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-1 rounded"
//           >
//             Search
//           </button>
//         </form>
//       </div>

//       {/* Message */}
//       {message && (
//         <p className="mb-3 text-sm text-gray-700 bg-gray-100 p-2 rounded">
//           {message}
//         </p>
//       )}

//       {/* Results Table */}
//       {results.length > 0 ? (
//         <>
//           <div className="overflow-x-auto mt-4">
//             <table className="table-auto w-full border border-gray-200 rounded shadow">
//               <thead className="bg-gray-800 text-white">
//                 <tr>
//                   <th className="px-4 py-2">First Name</th>
//                   <th className="px-4 py-2">Last Name</th>
//                   <th className="px-4 py-2">Policy Number</th>
//                   <th className="px-4 py-2">Policy Type</th>
//                   <th className="px-4 py-2">Age</th>
//                   <th className="px-4 py-2">Email</th>
//                   <th className="px-4 py-2">Phone</th>
//                   <th className="px-4 py-2">User ID</th>
//                   <th className="px-4 py-2">Role</th>
//                   <th className="px-4 py-2">Address</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {results.map((person) => (
//                   <tr
//                     key={person.policyNumber || person.userId}
//                     className="odd:bg-white even:bg-gray-50"
//                   >
//                     <td className="border px-4 py-2">{person.firstName}</td>
//                     <td className="border px-4 py-2">{person.lastName}</td>
//                     <td className="border px-4 py-2">{person.policyNumber}</td>
//                     <td className="border px-4 py-2">{person.typeOfInsurance}</td>
//                     <td className="border px-4 py-2">{person.age}</td>
//                     <td className="border px-4 py-2">{person.email}</td>
//                     <td className="border px-4 py-2">{person.phoneNumber}</td>
//                     <td className="border px-4 py-2">{person.userId}</td>
//                     <td className="border px-4 py-2">
//                       <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
//                         {person.role}
//                       </span>
//                     </td>
//                     <td className="border px-4 py-2">
//                       {[
//                         person?.street ? `${person.street} St` : null,
//                         person?.apartment,
//                         person?.city,
//                         person?.state,
//                         person?.country,
//                         person?.zipcode,
//                       ]
//                         .filter(Boolean)
//                         .join(", ")}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination only when query is empty */}
//           {!query.trim() && (
//             <div className="flex flex-col items-center gap-3 mt-4">
//               <div className="flex gap-2">
//                 {[...Array(totalPages).keys()].map((p) => (
//                   <button
//                     key={p}
//                     onClick={() => setPage(p)}
//                     className={`px-3 py-1 rounded ${
//                       page === p
//                         ? "bg-blue-600 text-white"
//                         : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                     }`}
//                   >
//                     {p + 1}
//                   </button>
//                 ))}
//               </div>

//               <div>
//                 <select
//                   value={page}
//                   onChange={(e) => setPage(Number(e.target.value))}
//                   className="px-2 py-1 border rounded"
//                 >
//                   {[...Array(totalPages).keys()].map((p) => (
//                     <option key={p} value={p}>
//                       Page {p + 1}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   disabled={!hasPrevious}
//                   onClick={() => setPage(page - 1)}
//                   className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded disabled:opacity-50"
//                 >
//                   Previous
//                 </button>
//                 <button
//                   disabled={!hasNext}
//                   onClick={() => setPage(page + 1)}
//                   className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:opacity-50"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}
//         </>
//       ) : (
//         <p className="text-muted">No insured persons found.</p>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";

const FIELD_LABELS = {
  firstName: "First Name",
  lastName: "Last Name",
  policyNumber: "Policy Number",
  typeOfInsurance: "Policy Type",
  age: "Age",
  email: "Email",
  phoneNumber: "Phone",
  userId: "User ID",
  role: "Role",
  // address fields (only visible in modal)
  street: "Street",
  apartment: "Apartment",
  city: "City",
  state: "State",
  country: "Country",
  zipcode: "Zip Code",
};

export default function PolicySearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const [editingRow, setEditingRow] = useState(null);
  const [editValues, setEditValues] = useState({});

  // Fetch all records (with pagination)
  useEffect(() => {
    if (query.trim()) return;
    fetchAll();
  }, [page, query]);

  const fetchAll = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://insuredperson-api-458668609912.us-central1.run.app/api/insuredpersons?offSet=${page}&pageSize=5`,
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
        setHasNext(data.hasNext);
        setHasPrevious(data.hasPrevious);
        setTotalPages(data.totalPages);
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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setPage(0);
      fetchAll();
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://insuredperson-api-458668609912.us-central1.run.app/api/insuredpersons/policySearch?query=${encodeURIComponent(
          query
        )}`,
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
        setHasNext(false);
        setHasPrevious(false);
        setTotalPages(1);
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

  const handleRowClick = (person) => {
    setEditingRow(person);
    setEditValues({ ...person });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://insuredperson-api-458668609912.us-central1.run.app/api/insuredpersons/${editValues.policyNumber}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editValues),
        }
      );
      console.log(response);
      if (!response.ok) throw new Error("Update failed");
      const updated = await response.json();

      setResults((prev) =>
        prev.map((r) =>
          r.policyNumber === updated.data.policyNumber ? updated.data : r
        )
      );

      setEditingRow(null);
      setEditValues({});
      alert("Updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating record");
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-primary border-b pb-2">
          Insured Persons
        </h2>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search by any field..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border rounded px-3 py-1 w-64"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-1 rounded"
          >
            Search
          </button>
        </form>
      </div>

      {message && (
        <p className="mb-3 text-sm text-gray-700 bg-gray-100 p-2 rounded">
          {message}
        </p>
      )}

      {results.length > 0 ? (
        <>
          <div className="overflow-x-auto mt-4">
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
                  <th className="px-4 py-2">Address</th>
                </tr>
              </thead>
              <tbody>
                {results.map((person) => (
                  <tr
                    key={person.policyNumber || person.userId}
                    className="odd:bg-white even:bg-gray-50 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleRowClick(person)}
                  >
                    <td className="border px-4 py-2">{person.firstName}</td>
                    <td className="border px-4 py-2">{person.lastName}</td>
                    <td className="border px-4 py-2">{person.policyNumber}</td>
                    <td className="border px-4 py-2">{person.typeOfInsurance}</td>
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
                      {[
                        person?.street ? `${person.street} St` : null,
                        person?.apartment,
                        person?.city,
                        person?.state,
                        person?.country,
                        person?.zipcode,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!query.trim() && (
            <div className="flex flex-col items-center gap-3 mt-4">
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
          )}
        </>
      ) : (
        <p className="text-muted">No insured persons found.</p>
      )}

      {/* Edit Modal */}
      {editingRow && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">
              Edit: {editingRow.policyNumber}
            </h3>
            {Object.keys(FIELD_LABELS).map((key) => (
              <div key={key} className="mb-2 flex flex-col">
                <label className="text-sm font-semibold">
                  {FIELD_LABELS[key]}
                </label>
                <input
                  value={editValues[key] || ""}
                  onChange={(e) =>
                    setEditValues({ ...editValues, [key]: e.target.value })
                  }
                  className="border rounded px-2 py-1"
                />
              </div>
            ))}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditingRow(null)}
                className="px-4 py-1 bg-gray-400 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-1 bg-green-600 rounded text-white hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
