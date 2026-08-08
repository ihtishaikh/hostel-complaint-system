# Hostel Complaint System

A full-stack web app that lets students submit hostel maintenance/mess complaints and track them through to resolution, instead of relying on verbal reports to wardens with no accountability trail.

## What I built
- Students submit complaints (category, block/room, description)
- Complaints move through a status lifecycle: **open → in-progress → resolved**, with a timestamped history of status changes
- Filter/search complaints by category and status
- Dashboard stats bar showing open/in-progress/resolved counts
- Fully responsive (mobile + desktop)
- Basic input validation (no empty submissions)
- **Bonus:** staff login (warden / hostel manager) — anyone can submit and view complaints without an account, but only logged-in staff can update status or delete a complaint

## Stack
- **Frontend:** React (Vite), Axios
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Deployment:** Frontend on Vercel, backend on Render, DB on MongoDB Atlas

Chose MERN because it's what I already know well from prior projects, and it kept the CRUD + status-lifecycle logic simple without needing extra tooling for a 3-day build.

## One challenge
<!-- Write this yourself after building — e.g. designing the status history so status changes are auditable instead of just overwriting a single field. -->

## One improvement
<!-- Write this yourself — e.g. add role-based auth for wardens vs students, or push notifications on status change. -->

## Running locally

### Backend
```bash
cd backend
cp .env.example .env   # fill in your MongoDB Atlas URI and a JWT_SECRET
npm install
npm run seed            # creates default warden/hostel-manager accounts — see src/seed.js
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend expects the backend at `http://localhost:5000` (see `frontend/src/api/complaints.js` — update the base URL after deploying).
