import axios from "axios";

// After deploying the backend, update this to your live Render URL
const API_BASE = "https://hostel-complaint-system-glht.onrender.com/api/complaints";

export const fetchComplaints = (params = {}) =>
  axios.get(API_BASE, { params }).then((res) => res.data);

export const fetchComplaintById = (id) =>
  axios.get(`${API_BASE}/${id}`).then((res) => res.data);

export const createComplaint = (data) =>
  axios.post(API_BASE, data).then((res) => res.data);

const authHeader = () => {
  const token = localStorage.getItem("staffToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const updateComplaintStatus = (id, status, note) =>
  axios
    .patch(`${API_BASE}/${id}/status`, { status, note }, { headers: authHeader() })
    .then((res) => res.data);

export const deleteComplaint = (id) =>
  axios.delete(`${API_BASE}/${id}`, { headers: authHeader() }).then((res) => res.data);
