const stampClass = {
  open: "stamp-open",
  "in-progress": "stamp-progress",
  resolved: "stamp-resolved",
};

const refNumber = (id) => `HC-${id.slice(-6).toUpperCase()}`;

export default function ComplaintList({ complaints, onSelect, loading }) {
  if (loading) return <p className="empty-state">Loading the register…</p>;
  if (complaints.length === 0)
    return <p className="empty-state">No entries match these filters — try clearing them.</p>;

  return (
    <div className="complaint-list">
      {complaints.map((c) => (
        <div key={c._id} className="complaint-card" onClick={() => onSelect(c._id)}>
          <div className="slip-stub" aria-hidden="true" />
          <div className="slip-body">
            <div className="complaint-card-header">
              <div>
                <span className="ref-no">REF. {refNumber(c._id)}</span>
                <h3>{c.title}</h3>
              </div>
              <span className={`stamp ${stampClass[c.status]}`}>{c.status}</span>
            </div>
            <p className="complaint-meta">
              {c.category} · {c.hostelBlock}
              {c.roomNo ? ` / Room ${c.roomNo}` : ""}
            </p>
            <p className="complaint-desc">{c.description}</p>
            <p className="complaint-date">Filed {new Date(c.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
