// Run once to create staff accounts: npm run seed
// Edit the accounts below before running, then change these passwords after first login.
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import mongoose from "mongoose";

dotenv.config();

const accounts = [
  { username: "warden1", password: "changeme123", role: "warden" },
  { username: "manager1", password: "changeme123", role: "hostel-manager" },
];

const seed = async () => {
  await connectDB();

  for (const acc of accounts) {
    const exists = await User.findOne({ username: acc.username });
    if (exists) {
      console.log(`Skipping ${acc.username}, already exists`);
      continue;
    }
    const passwordHash = await bcrypt.hash(acc.password, 10);
    await User.create({ username: acc.username, passwordHash, role: acc.role });
    console.log(`Created ${acc.role} account: ${acc.username} / ${acc.password}`);
  }

  await mongoose.disconnect();
  console.log("Seeding complete.");
};

seed();
