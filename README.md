# JasHub Parcel Tracking System 📦

## About

JasHub is a parcel tracking and management system developed as part of a **IMS560 - Advanced Database Management System** course assignment. The system allows students to track parcels, make payments, and view collection history. Administrators have access to a dashboard for managing parcels, users, couriers, categories, and contact messages.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** React.js, TailwindCSS
- **Database:** MongoDB Atlas

## Features

| Feature | Description |
|---|---|
| 📦 Parcel Tracking | Real-time tracking with tracking number search |
| 💰 Dynamic Pricing | Weight-based pricing with overdue penalty calculation |
| 💳 Online Payment | Internet banking and pay-at-counter options |
| 👤 User Dashboard | View personal info, parcel history, and collection records |
| 🔐 Authentication | Secure login and registration with JWT and bcrypt |
| 🛠️ Admin Dashboard | Full CRUD operations for parcels, users, couriers, and categories |
| 📊 Reports | Analytics and statistics for parcel management |
| 📬 Contact Messages | Users can send messages; admins can view and reply |
| 🚚 Courier Management | Manage courier companies with tracking URLs |
| 🏷️ Category Management | Organize parcels by weight, month, and parcel type |
| 📱 Responsive Design | Mobile-first approach using TailwindCSS |
| 🌙 Dark Mode | System-wide dark theme toggle |

## Setup Instructions

### 1. Clone or Download:

- Clone this repository OR click **Code > Download ZIP**.
- If downloading ZIP, extract it to your desired folder (e.g., `C:\laragon\www\` folder).

### 2. Install Dependencies:

- Open your terminal in the project directory.

- Install backend dependencies:
  ```bash
  cd C:\laragon\www\parcelsystem\backend
  npm install
  ```

- Install frontend dependencies:
  ```bash
  cd C:\laragon\www\parcelsystem\frontend
  npm install
  ```

### 3. Database Setup:

- The system uses **MongoDB Atlas** (cloud database). No local database setup is required.
- Create a `.env` file inside the `backend/` folder **(IF .env file doesn't exist in the Backend Folder)** with the following content:
  ```
  ATLAS_URI=mongodb+srv://najmiii639:parcelsystem@parcelsystem.zg2j7it.mongodb.net/
  JWT_SECRET=parcelhub_jwt_secret_key_2025
  ```

- **Connect to MongoDB Atlas:**
  1. Open **MongoDB Compass** (download from [mongodb.com/products/compass](https://www.mongodb.com/products/compass) if not installed).
  2. In the **New Connection** window, paste the following URI into the connection string field:
     ```
     mongodb+srv://najmiii639:parcelsystem@parcelsystem.zg2j7it.mongodb.net/
     ```
  3. Click **Connect** to view and manage the database collections.

  > **Alternatively**, you can connect via the **MongoDB Atlas** web dashboard:
  > 1. Go to [cloud.mongodb.com](https://cloud.mongodb.com/) and log in.
  > 2. Navigate to **Database** > **Connect** > **Connect using MongoDB Compass**.
  > 3. Copy the connection string and use it in MongoDB Compass as described above.
### 4. Run the App:

- Start the backend server:
  ```bash
  cd :\laragon\www\parcelsystem\backend
  node server.js
  ```
  The backend will run on: `http://localhost:5000`

- Start the frontend dev server (in a new terminal):
  ```bash
  cd C:\laragon\www\parcelsystem\frontend
  npm start
  ```
  The frontend will run on: `http://localhost:3000`

- Access the homepage at: [http://localhost:3000](http://localhost:3000)

## Demo Accounts

| Role | Student ID | Password |
|---|---|---|
| Admin | 1 | 123456 |
| User | 2025197521 | 123456 |

> **Note:** You can register a new student account through the app's registration page, or create users via the Admin panel.

## Contributors

| Name | Role | Phone Number |
|---|---|---|
| Megat Naufal | Project Manager | 011-6404 6283 |
| Amir Amsyar | Frontend Developer | 014-699 3203 |
| Muhammad Najmi | Backend Developer | 011-6211 7734 |
| Faris Afizuan | System Analyst | 019-950 4432 |

## Acknowledgements

- React.js
- Express.js
- MongoDB Atlas
- TailwindCSS
- Framer Motion
- Node.js
- JSON Web Tokens (JWT)

Made with **React.js** and **Express.js** for ADVANCED DATABASE MANAGEMENT SYSTEM (IMS560) Group Assignment.
