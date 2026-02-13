# ⏳ HourVault - Digital Time Bank Application

> **Time is Money.** A decentralized service exchange platform where users trade skills and services using time credits instead of currency.

## 📖 Overview
HourVault is a **Time Banking System** designed to facilitate community service exchange. Unlike traditional freelancing platforms, it uses a closed-loop economy where **1 Hour of Work = 1 Time Credit**. 

The core feature is a secure **Escrow Transaction System**: when a user requests a service, their hours are "locked" (deducted) immediately but are only released to the provider after the work is completed and verified by the buyer.

## 🚀 Key Features

### 🔐 Security & Authentication
* **JWT Authentication:** Secure login/signup with HTTP-only cookies/local storage.
* **Password Encryption:** bcrypt hashing to protect user credentials.
* **Route Protection:** Middleware to prevent unauthorized access to private dashboards.

### 💸 The "Time Economy" (Transaction Engine)
* **Post Services:** Users can list skills (e.g., "Teach Java", "Walk Dog") with a cost in hours.
* **Escrow Logic:** 1.  **Request:** Buyer clicks "Request" → Hours deducted & held in limbo.
    2.  **Work:** Seller performs the task.
    3.  **Verify:** Seller marks as complete → Hours released to Seller's wallet.
* **Wallet System:** Real-time balance updates upon transaction completion.

### 🎨 User Interface
* **Dashboard:** View active listings, current wallet balance, and service status.
* **Status Tracking:** Visual indicators for service states (`Open` → `In Progress` → `Completed`).
* **Responsive Design:** Built with **Tailwind CSS** for mobile and desktop compatibility.

---

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React.js (Vite) | Component-based UI with Hooks (`useState`, `useEffect`) |
| **Styling** | Tailwind CSS | Utility-first CSS framework for rapid UI development |
| **Backend** | Node.js & Express | RESTful API architecture |
| **Database** | MongoDB & Mongoose | NoSQL database with schema validation |
| **Auth** | JSON Web Tokens (JWT) | Stateless authentication mechanism |

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### Prerequisites
* Node.js (v14+)
* MongoDB (Local or Atlas URL)

### 1. Clone the Repository
```bash


<img width="1920" height="933" alt="Screenshot 2026-02-06 120903" src="https://github.com/user-attachments/assets/dbc3bac7-9f2c-4681-851b-966a3ef81b72" />
<img width="1920" height="861" alt="Screenshot (56)" src="https://github.com/user-attachments/assets/c72fe41e-e463-4aec-a9c1-5a2939e5d1a2" />
<img width="1920" height="837" alt="Screenshot (55)" src="https://github.com/user-attachments/assets/18166172-6ff7-46c0-a5bb-12b3f49ad387" />
