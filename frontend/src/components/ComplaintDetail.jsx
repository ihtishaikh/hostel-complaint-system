import { useState } from "react";

const NEXT_STATUS = {
  open: "in-progress",
  "in-progress": "resolved",
  resolved: null,
};

export default function ComplaintDetail({ complaint, onClose, onUpdateStatus, onDelete, staff }) {
  const [note, setNote] = useState("");
  const next = NEXT_STATUS[complaint.status];
  const refNumber = `HC-${complaint._id.slice(-6).toUpperCase()}`;

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-panel" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <span className="ref-no">REF. {refNumber}</span>
        <h2>{complaint.title}</h2>
        <p className="complaint-meta">
          {complaint.category} · {complaint.hostelBlock}
          {complaint.roomNo ? ` / Room ${complaint.roomNo}` : ""}
        </p>
        <p>{complaint.description}</p>

        <h4>Status History</h4>
        <ul className="status-history">
          {complaint.statusHistory.map((h, i) => (
            <li key={i}>
              <strong>{h.status}</strong> — {new Date(h.changedAt).toLocaleString()}
              {h.note ? `: ${h.note}` : ""}
            </li>
          ))}
        </ul>

        {staff ? (
          <>
            {next && (
              <div className="status-update">
                <input
                  type="text"
                  placeholder="Optional note (e.g. plumber assigned)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <button onClick={() => onUpdateStatus(complaint._id, next, note)}>
                  Mark as {next}
                </button>
              </div>
            )}
            <button className="danger-btn" onClick={() => onDelete(complaint._id)}>
              Delete Complaint
            </button>
          </>
        ) : (
          <p className="complaint-meta" style={{ marginTop: 16 }}>
            Log in as staff to update status or delete this complaint.
          </p>
        )}
      </div>
    </div>
  );
}
