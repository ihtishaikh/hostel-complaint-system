import axios from "axios";

const API_BASE = "https://hostel-complaint-system-glht.onrender.com/api/auth";

export const login = (username, password) =>
  axios.post(`${API_BASE}/login`, { username, password }).then((res) => res.data);
