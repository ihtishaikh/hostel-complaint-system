import mongoose from "mongoose";

const statusHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved"],
      required: true,
    },
    note: { type: String, default: "" },
    changedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const complaintSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["maintenance", "mess", "other"],
      required: true,
    },
    description: { type: String, required: true, trim: true },
    hostelBlock: { type: String, required: true, trim: true },
    roomNo: { type: String, trim: true },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved"],
      default: "open",
    },
    statusHistory: {
      type: [statusHistorySchema],
      default: () => [{ status: "open", note: "Complaint submitted" }],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
