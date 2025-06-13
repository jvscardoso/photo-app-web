# 📸 Photo Gallery Web

This is a web application built with **React + Vite** that connects to a RESTful API to allow users to **register, authenticate, view, like, and manage photos**. Authenticated users can explore photo galleries, view a random daily photo, like photos, and manage their own uploads. Admin users have access to additional management capabilities.

---

## 🚀 Features

- User registration and login with JWT authentication
- Retrieve a random daily photo (no authentication required)
- View all photos, individual photos, or photos by photographer
- Explore other photographers' portfolios and profiles
- Upload photos with metadata (URL, dimensions, color, etc.)
- Like/unlike photos
- View all users on the platform (admins only)

---

## 🛠️ Tech Stack

- React
- Vite
- Material UI
- React Router
- Axios
- JWT
- Yup

---

## ⚙️ Installation

Before getting started, make sure the **backend** is up and running ([API repository link goes here](https://github.com/jvscardoso/photo-app-api)).  
Without the backend, the application will not function properly.

### 1. Clone the repository

```bash
git clone https://github.com/jvscardoso/photo-app-web.git
cd photo-app-web
```

### 2. Instale as dependências:
   ```bash
   npm install
   ```

### 3. Configure environment variables
Make a copy of the `.env.example` file and rename it to `.env`.


### 4. Run the application:
   ```bash
   npm run dev
   ```

Then open [http://localhost:5173](http://localhost:5173) in your browser


## 🔑 Credentials

| E-mail            | Password |
|-------------------|----------|
| `admin@clever.io` | admin123 |
| `nick@clever.io`  | nick123  |
| `lukas@clever.io` | user123  |

**Developed by [João Vitor Cardoso]**