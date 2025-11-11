# FuelEU Maritime Compliance Platform ⚓

A full-stack application implementing **FuelEU Maritime Regulation** logic — including route emissions comparison, compliance balance, **banking**, and **pooling** mechanisms — built using **Hexagonal Architecture**.

---

## 🧩 Architecture Summary

**Pattern:** Hexagonal (Ports & Adapters)  
**Stack:**

- **Frontend:** React + TypeScript + Axios
- **Backend:** Node.js + Express + Prisma ORM
- **Database:** PostgreSQL

### Layers Overview

```text
Frontend (React UI)
        ↓
Inbound Adapter (HTTP Controllers)
        ↓
Core Application (Services + Domain)
        ↓
Outbound Adapter (Prisma Repository)
        ↓
Database (PostgreSQL)
```

### UML Diagram

<p align="center">
  <img src="https://ik.imagekit.io/kcekezhkm/umlDiagram.png?updatedAt=1762831856250" alt="ThinkFlow Banner" width="700"/>
</p>

### Key Modules

- **routes** — Compare route GHG intensities and compute compliance.
- **banking** — Bank and apply surplus balances.
- **pooling** — Create emission compliance pools between ships.

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone "https://github.com/saurabh-develop/FuelEU-Maritime.git"
```

### 2. Environment Setup

Create `.env` in `/backend`:

```bash
DATABASE_URL="postgresql://postgres:<password>@localhost:5432/fueleu?schema=public"
```

### 3. Run Prisma

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Start Server

```bash
npm run dev
```

Server runs at http://localhost:4000

### 5. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at http://localhost:5173

---

## 🧪 Running Tests

```bash
npm run test
```

Tests use Jest + Supertest for backend and React Testing Library for frontend.

---

## 📊 Sample Requests

GET /routes

```bash
[
  {
    "routeId": "R1",
    "vesselType": "Cargo",
    "ghgIntensity": 78.1,
    "isBaseline": false
  }
]
```

POST /banking/bank

```bash
{
  "shipId": "SHIP_001",
  "year": 2025,
  "amount": 42.5
}
```
