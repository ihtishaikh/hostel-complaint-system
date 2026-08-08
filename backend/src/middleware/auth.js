import jwt from "jsonwebtoken";

// Protects a route: requires a valid Bearer token from a logged-in staff account
export const requireStaff = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Login required for this action" });
  }

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, username, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired session, please log in again" });
  }
};
