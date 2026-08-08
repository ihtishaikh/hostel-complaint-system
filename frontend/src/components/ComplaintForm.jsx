import { useState } from "react";

const initialState = {
  title: "",
  category: "maintenance",
  description: "",
  hostelBlock: "",
  roomNo: "",
};

export default function ComplaintForm({ onSubmit }) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.description.trim()) errs.description = "Description is required";
    if (!form.hostelBlock.trim()) errs.hostelBlock = "Block/hostel is required";
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      await onSubmit(form);
      setForm(initialState);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="complaint-form" onSubmit={handleSubmit}>
      <h2>Submit a Complaint</h2>
      <p className="form-sub">Hostel Maintenance &amp; Mess Register</p>

      <label>
        Title
        <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Leaking tap in room 204" />
        {errors.title && <span className="error">{errors.title}</span>}
      </label>

      <label>
        Category
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="maintenance">Maintenance</option>
          <option value="mess">Mess</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label>
        Hostel Block
        <input name="hostelBlock" value={form.hostelBlock} onChange={handleChange} placeholder="e.g. Block C" />
        {errors.hostelBlock && <span className="error">{errors.hostelBlock}</span>}
      </label>

      <label>
        Room No. (optional)
        <input name="roomNo" value={form.roomNo} onChange={handleChange} placeholder="e.g. 204" />
      </label>

      <label>
        Description
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          placeholder="Describe the issue in detail..."
        />
        {errors.description && <span className="error">{errors.description}</span>}
      </label>

      <button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Complaint"}
      </button>
    </form>
  );
}
