import { useEffect, useState, useCallback } from "react";
import ComplaintForm from "./components/ComplaintForm.jsx";
import ComplaintList from "./components/ComplaintList.jsx";
import ComplaintDetail from "./components/ComplaintDetail.jsx";
import FilterBar from "./components/FilterBar.jsx";
import StatsBar from "./components/StatsBar.jsx";
import Login from "./components/Login.jsx";
import {
  fetchComplaints,
  createComplaint,
  fetchComplaintById,
  updateComplaintStatus,
  deleteComplaint,
} from "./api/complaints.js";

export default function App() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: "", status: "", search: "" });
  const [view, setView] = useState("list"); // "list" | "form"
  const [selected, setSelected] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [staff, setStaff] = useState(() => {
    const username = localStorage.getItem("staffUsername");
    const role = localStorage.getItem("staffRole");
    return username ? { username, role } : null;
  });

  const loadComplaints = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchComplaints(filters);
      setComplaints(data);
    } catch (err) {
      console.error("Failed to load complaints", err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadComplaints();
  }, [loadComplaints]);

  const handleCreate = async (form) => {
    await createComplaint(form);
    setView("list");
    loadComplaints();
  };

  const handleSelect = async (id) => {
    const complaint = await fetchComplaintById(id);
    setSelected(complaint);
  };

  const handleUpdateStatus = async (id, status, note) => {
    const updated = await updateComplaintStatus(id, status, note);
    setSelected(updated);
    loadComplaints();
  };

  const handleDelete = async (id) => {
    await deleteComplaint(id);
    setSelected(null);
    loadComplaints();
  };

  const handleLogin = (data) => {
    localStorage.setItem("staffToken", data.token);
    localStorage.setItem("staffUsername", data.username);
    localStorage.setItem("staffRole", data.role);
    setStaff({ username: data.username, role: data.role });
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("staffToken");
    localStorage.removeItem("staffUsername");
    localStorage.removeItem("staffRole");
    setStaff(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <div className="crest">AI</div>
          <div className="brand-text">
            <h1>AITM Hostel Complaint System</h1>
            <p>Anjuman Institute of Technology &amp; Management</p>
          </div>
        </div>
        <nav>
          <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}>
            Complaints
          </button>
          <button className={view === "form" ? "active" : ""} onClick={() => setView("form")}>
            + New Complaint
          </button>
          {staff ? (
            <button onClick={handleLogout}>
              {staff.role === "warden" ? "Warden" : "Manager"}: {staff.username} (Log out)
            </button>
          ) : (
            <button onClick={() => setShowLogin(true)}>Staff Login</button>
          )}
        </nav>
      </header>

      <main>
        {view === "form" ? (
          <ComplaintForm onSubmit={handleCreate} />
        ) : (
          <>
            <StatsBar complaints={complaints} />
            <FilterBar filters={filters} setFilters={setFilters} />
            <ComplaintList complaints={complaints} onSelect={handleSelect} loading={loading} />
          </>
        )}
      </main>

      {selected && (
        <ComplaintDetail
          complaint={selected}
          onClose={() => setSelected(null)}
          onUpdateStatus={handleUpdateStatus}
          onDelete={handleDelete}
          staff={staff}
        />
      )}

      {showLogin && <Login onLogin={handleLogin} onCancel={() => setShowLogin(false)} />}
    </div>
  );
}
