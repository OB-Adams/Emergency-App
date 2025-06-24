# 🚨 Emergency Assistance App

The **Emergency Assistance App** is a full-stack web application built with **Next.js**, **React**, and **MongoDB** that allows users to request emergency help and enables admins to monitor and manage those requests in real-time. The app uses the **Google Maps API** for accurate location tracking, place search, and route directions.

---

## 🔧 Features

### 👤 User Features
- **User Registration & Login**
- **Submit Emergency Requests**
- **Live Location Sharing via Google Maps**
- **Mobile-Friendly Interface**

### 🛠️ Admin Features
- **Admin Login**
- **View All Emergency Requests**
- **Access User Locations**
- **Search and Navigate using Google Maps**

---

## 🛠 Tech Stack

- **Frontend**: Next.js (App Router), React, Tailwind CSS  
- **Backend**: Next.js API Routes (Server Actions)  
- **Database**: MongoDB Atlas  
- **Authentication**: Credential-based login for Admins and Users  
- **Maps**: Google Maps JavaScript API (Autocomplete, Geocoding, Directions)  
- **Others**: bcryptjs, dotenv, Mongoose

---

## 📁 Project Structure

```bash
/emergency-app
│
├── app/
│   ├── login/
│   ├── register/
│   ├── dashboard/           # Admin view
│   ├── profile/             # User profile page
│   └── emergency-request/   # Emergency request form
│
├── lib/utils/db.js          # MongoDB connection
├── models/                  # Mongoose schemas
│   ├── user.js
│   ├── adminUser.js
│   └── emergencyRequest.js
├── public/
├── .env.local
├── next.config.js
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repo

```bash
git clone https://github.com/ob-Adams/emergency-app.git
cd emergency-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/auth_db
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXTAUTH_SECRET=your_auth_secret
```

> Replace `<username>`, `<password>`, and `<cluster>` with your MongoDB Atlas details.

### 4. Seed Admin Users (Optional)

In your seed script:

```js
// Example: seed.js
import bcrypt from 'bcryptjs';
const hashedPassword = await bcrypt.hash('admin123', 10);
await adminUsersCollection.insertOne({ username: 'admin', password: hashedPassword });
```

### 5. Run the Development Server

```bash
npm run dev
```

Access the app at [http://localhost:3000](http://localhost:3000)

---

## 🗺 Maps & Location Features

The app integrates with the **Google Maps JavaScript API** to offer:

- Autocomplete search for locations
- Reverse geocoding (coordinates → address)
- Directions and routing for emergency paths
- Displaying markers for emergency requests and users

---

## 🔐 Authentication

- Users and Admins are stored in separate collections (`users`, `admin_users`)
- Passwords are hashed with `bcryptjs`
- Sessions handled via `next-auth` (or custom logic depending on implementation)

---

## 📦 MongoDB Schema Overview

### `users`
```js
{
  _id,
  name,
  email,
  password,
  phoneNumber,
  location: { lat, lng },
  createdAt
}
```

### `admin_users`
```js
{
  _id,
  username,
  password
}
```

### `emergency_requests`
```js
{
  _id,
  userId,
  type: "Fire" | "Medical" | "Security",
  description,
  location: { lat, lng },
  status: "pending" | "resolved",
  createdAt
}
```

---

## 🔁 API Routes

| Method | Route                          | Description                   |
|--------|-------------------------------|-------------------------------|
| POST   | `/api/auth/login`             | Login user or admin           |
| POST   | `/api/users`                  | Register user                 |
| GET    | `/api/emergency-requests`     | Get all emergency requests    |
| POST   | `/api/emergency-requests`     | Create new emergency request  |
| PUT    | `/api/emergency-requests/:id` | Update request status         |

---

## 🚀 Deployment

### Recommended Platform: **Vercel**

#### 1. Push to GitHub

```bash
git push origin main
```

#### 2. Create New Project on Vercel

- Connect your GitHub repo
- Set environment variables:
  - `MONGO_URI`
  - `GOOGLE_MAPS_API_KEY`
  - `NEXTAUTH_SECRET`

#### 3. Deploy

Vercel will auto-detect the Next.js project and deploy your app.

---

## 🧪 Testing & Validation

- ✅ Register a user and login
- ✅ Use Google Maps to select your location
- ✅ Submit an emergency request
- ✅ Admin logs in and views pending requests
- ✅ Use directions on the map to trace user location

---

## ❗ Troubleshooting

- **MongoDB connection error**: Check `MONGO_URI` and IP whitelisting on Atlas.
- **Google Maps not displaying**: Validate API key and ensure billing is enabled.
- **Unauthorized Access**: Ensure sessions or JWT handling is properly implemented.

---

## 🤝 Contributing

1. Fork the repo
2. Create a new feature branch:  
   ```bash
   git checkout -b feature/my-feature
   ```
3. Commit your changes and push  
4. Submit a Pull Request

---

## 📜 License

Licensed under the MIT License.

---

## 📬 Contact

Have questions or feedback?

- Email: [obobadams@gmail.com](mailto:obobadams@gmail.com)
- GitHub: [ob-Adams/emergency-app](https://github.com/ob-Adams/emergency-app)

---

⭐ **If you found this app helpful, give it a star!**
