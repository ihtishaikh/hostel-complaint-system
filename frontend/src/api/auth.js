import axios from "axios";

const API_BASE = "http://localhost:5000/api/auth";

export const login = (username, password) =>
  axios.post(`${API_BASE}/login`, { username, password }).then((res) => res.data);
