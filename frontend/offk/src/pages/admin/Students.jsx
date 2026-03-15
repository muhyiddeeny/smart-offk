// src/pages/admin/Students.jsx
import { useState, useEffect } from "react";
import API from "../../api/api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ regNumber: "", name: "" });
  const [loading, setLoading] = useState(false);

  // Load students
  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Add new student (default password = "password")
  const addStudent = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.post("/students", {
        regNumber: form.regNumber,
        name: form.name,
      });
      alert("Student added successfully!");
      setForm({ regNumber: "", name: "" });
      fetchStudents();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add student");
    } finally {
      setLoading(false);
    }
  };

  // Delete student
  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await API.delete(`/students/${id}`);
      fetchStudents();
    } catch (err) {
      alert("Error deleting student");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Student Management</h1>

      {/* Add Student Form */}
      <form onSubmit={addStudent} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Registration Number (e.g., ATBU/19/1234)"
          className="border p-2 w-full rounded"
          value={form.regNumber}
          onChange={(e) => setForm({ ...form, regNumber: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Full Name (e.g., Yahya Muhammad)"
          className="border p-2 w-full rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Student"}
        </button>
      </form>

      {/* Students List */}
      <h2 className="text-xl font-semibold mb-3">Registered Students</h2>

      {students.length === 0 ? (
        <p className="text-gray-500">No students registered yet.</p>
      ) : (
        <table className="w-full border text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Reg Number</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td className="p-2 border">{s.regNumber}</td>
                <td className="p-2 border">{s.name}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => deleteStudent(s._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

