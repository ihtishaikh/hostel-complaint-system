import Complaint from "../models/Complaint.js";

// POST /api/complaints
export const createComplaint = async (req, res) => {
  try {
    const { title, category, description, hostelBlock, roomNo } = req.body;

    if (!title?.trim() || !category?.trim() || !description?.trim() || !hostelBlock?.trim()) {
      return res.status(400).json({ message: "title, category, description and hostelBlock are required" });
    }

    const complaint = await Complaint.create({
      title,
      category,
      description,
      hostelBlock,
      roomNo,
    });

    res.status(201).json(complaint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET /api/complaints?category=&status=&search=
export const getComplaints = async (req, res) => {
  try {
    const { category, status, search } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { hostelBlock: { $regex: search, $options: "i" } },
      ];
    }

    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/complaints/:id
export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });
    res.json(complaint);
  } catch (err) {
    res.status(400).json({ message: "Invalid complaint id" });
  }
};

// PATCH /api/complaints/:id/status
export const updateComplaintStatus = async (req, res) => {
  try {
    const { status, note } = req.body;
    if (!["open", "in-progress", "resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    complaint.status = status;
    complaint.statusHistory.push({ status, note: note || "" });
    await complaint.save();

    res.json(complaint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/complaints/:id
export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });
    res.json({ message: "Complaint deleted" });
  } catch (err) {
    res.status(400).json({ message: "Invalid complaint id" });
  }
};
