import express from "express";
import {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaintStatus,
  deleteComplaint,
} from "../controllers/complaintController.js";
import { requireStaff } from "../middleware/auth.js";

const router = express.Router();

// Open to all students: submit + view + search, no login needed
router.route("/").get(getComplaints).post(createComplaint);
router.route("/:id").get(getComplaintById);

// Staff-only: warden or hostel manager must be logged in
router.route("/:id").delete(requireStaff, deleteComplaint);
router.route("/:id/status").patch(requireStaff, updateComplaintStatus);

export default router;
