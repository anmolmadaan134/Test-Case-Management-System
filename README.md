# 🧪 Test Case Management System (TCMS)

A full-stack **Test Case Management System** built to manage projects, test cases, executions, and analytics — similar to lightweight QA tools used in real-world software teams.

🚀 **Production URL**  
👉 https://test-case-management-system-three.vercel.app/

---

## 📌 Overview

This project helps QA teams and developers to:

- Create and manage **projects**
- Add **test cases** per project
- Execute test cases and track **Pass / Fail status**
- Visualize execution analytics using **charts**
- Export test cases to **CSV**
- Enforce **role-based access control**
- Work with **real production-grade architecture**

The system is designed with **scalability, correctness, and real-world workflows** in mind.

---

## 🔐 Demo Credentials (For Interview / Evaluation)

The application is preconfigured with **demo users** for evaluation purposes.

You can log in using **any one** of the following accounts:

```
Email: admin@test.com
Password: test123
```

```
Email: lead@test.com
Password: test123
```

> ⚠️ These credentials are **for demo and interview purposes only**.  
> In a real production environment, user registration and secure password policies would be enforced.

---


## 🏗️ Tech Stack

### Frontend
- **React 18**
- **React Router**
- **Tailwind CSS**
- **Recharts / Chart.js**
- **Axios**
- **Vite**

### Backend
- **Node.js (Express)**
- **PostgreSQL (Neon DB)**
- **Redis (Caching)**
- **JWT Authentication**
- **RBAC (Role Based Access Control)**

### Deployment
- **Frontend** → Vercel  
- **Backend** → Render  
- **Database** → Neon (PostgreSQL)  
- **Redis** → Render Redis  

---

## 👥 User Roles

| Role | Permissions |
|----|----|
| **Admin** | Create projects, test cases, execute tests |
| **Test Lead** | Manage test cases & executions |
| **Tester** | Execute tests |
| **Read-only** | View dashboards only |

---

## ✨ Key Features

### ✅ Project Management
- Create and list projects
- Switch active project globally

### ✅ Test Case Management
- Create test cases **per project**
- View test cases filtered by project
- Prevent cross-project data leakage

### ✅ Test Execution
- Execute test cases
- Store execution history
- Enforce project-testcase validation

### ✅ Analytics Dashboard
- Execution Status (Pie Chart)
- Execution Trend (Line Chart)
- Priority Distribution (Bar Chart)
- Fully **project-aware analytics**

### ✅ CSV Export
- Export all test cases of a project to CSV
- One-click download

### ✅ Authentication & Security
- JWT-based authentication
- Protected routes
- RBAC enforcement
- Backend validation for project ownership

---

## 🧠 Important Architectural Decisions

### 1. Project-Scoped Data (Critical Fix)
All entities (test cases, executions, analytics) are **strictly scoped to project_id**.

This prevents:
- Wrong analytics across projects
- Showing test cases in incorrect projects
- Data corruption

### 2. Backend Validation (Defense-in-Depth)
Even if frontend sends wrong data:
- Backend validates project ownership
- Prevents invalid executions

### 3. Redis Caching
- Cached project list
- Cache invalidation on writes
- Faster dashboard performance

---

## 📂 Folder Structure

```text

Test-Case-Management-System/
│
├── backend/
│ ├── src/
│ │ ├── config/ # DB & Redis config
│ │ ├── controllers/ # Analytics controllers
│ │ ├── routes/ # API routes
│ │ ├── middlewares/ # Auth & RBAC
│ │ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── pages/ # Dashboard, Projects, TestCases
│ │ ├── components/ # Charts, Modals
│ │ ├── context/ # Auth & Project context
│ │ └── services/ # Axios instance
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (`Render`)
```
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=your_secret
NODE_ENV=production
PORT=5000
```

### Frontend (`Vercel`)

```
VITE_API_URL=https://<your-backend-url>/api
```


---

## 🧪 Running Locally

### 1️⃣ Clone Repository
```bash
git clone https://github.com/anmolmadaan134/Test-Case-Management-System
cd Test-Case-Management-System

```

### 2️⃣ Backend Setup

```bash
cd backend
npm i
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm i
npm run dev
```

## 🚀 Deployment Details

### Frontend
- Deployed on **Vercel**
- Auto-deploy enabled on **GitHub push**

### Backend
- Deployed on **Render**
- **Build command:** `npm install`
- **Start command:** `node src/server.js`
- **Node version:** `20.x`

---

