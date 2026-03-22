# Tasko

A full-stack startup workspace application with authentication, built for student founders.

## Project Structure

```
Tasko1/
├── backend/                 # Express.js API
│   ├── models/
│   │   └── User.js          # User model (Mongoose)
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── auth.js      # Auth API calls
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── Components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── CTA.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ...
│   │   └── Pages/
│   │       ├── Home.jsx
│   │       ├── Register.jsx
│   │       ├── Login.jsx
│   │       └── Dashboard.jsx
│   └── package.json
│
└── README.md
```

## Prerequisites

- **Node.js** (v18+)
- **MongoDB** (local or Atlas)

## Setup

### 1. Backend

```bash
cd backend
npm install
```

Create a `.env` file (copy from `.env.example`):

```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/tasko
CLIENT_URL=http://localhost:5173
SESSION_SECRET=your-secret-key
```

Start the server:

```bash
npm run dev
```

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and proxies `/api` to the backend.

## User Flow

1. **Visit site** → Landing page
2. **Click Register** → Create account (name, email, password)
3. **Login** → Redirected to Dashboard
4. **Dashboard** → Shows user name and info
5. **Logout** → Returns to landing page

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/user/dashboard` | Get current user (protected) |

## Frontend Routes

| Path | Page |
|------|------|
| `/` | Landing Page |
| `/register` | Register Page |
| `/login` | Login Page |
| `/dashboard` | User Dashboard (protected) |
