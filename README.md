# Intro to Backend Development

A beginner-friendly, production-ready backend application built with **Node.js**, **Express.js**, and **MongoDB Atlas** using **Mongoose**. This project implements user authentication (Registration, Login, and Logout) and complete CRUD operations for Posts following the clean **Model-Route-Controller (MRC)** architectural pattern.

This project is based on the [freeCodeCamp Intro to Backend Development Tutorial](https://www.youtube.com/watch?v=KOutPbKc9UM).

---

## 🚀 Technologies Used

- **Runtime Environment:** [Node.js](https://nodejs.org/) (ES Modules)
- **Web Framework:** [Express.js](https://expressjs.com/)
- **Database & ODM:** [MongoDB Atlas](https://www.mongodb.com/atlas) with [Mongoose](https://mongoosejs.com/)
- **Security & Cryptography:** [bcrypt](https://www.npmjs.com/package/bcrypt) (Salt rounds: 10)
- **Environment Management:** [dotenv](https://www.npmjs.com/package/dotenv)
- **Development Tooling:** [Nodemon](https://nodemon.io/)
- **API Testing:** [Postman](https://www.postman.com/)

---

## 📁 Project Folder Structure

```
Backend-Project-/
├── backend/
│   └── src/
│       ├── app.js                      # Express application setup, middlewares, routes, 404 & error handlers
│       ├── index.js                    # Server entry point: loads env, connects to DB, starts listener
│       ├── config/
│       │   ├── constants.js            # Global constants (DB_NAME = "intro-to-backend")
│       │   └── database.js             # Mongoose connection logic using MONGODB_URI
│       ├── controllers/
│       │   ├── post.controller.js      # CRUD logic for posts (create, getPosts, update, delete)
│       │   └── user.controller.js      # Auth logic (register, login, logout)
│       ├── models/
│       │   ├── post.model.js           # Mongoose schema and model for Post
│       │   └── user.model.js           # Mongoose schema and model for User with bcrypt hashing
│       └── routes/
│           ├── post.route.js           # Express router endpoints for Posts
│           └── user.route.js           # Express router endpoints for Users
├── postman/
│   ├── Backend_Project.postman_collection.json   # Ready-to-import Postman API collection
│   └── Backend_Project.postman_environment.json  # Postman environment configuration (baseUrl)
├── .env.example                        # Template for environment variables
├── .gitignore                          # Git ignore rules (node_modules, .env, logs)
├── package.json                        # Node dependencies and project scripts
├── package-lock.json                   # Locked dependency tree
└── README.md                           # Project documentation
```

---

## 🏗️ Architecture: Model-Route-Controller (MRC)

This project strictly adheres to the Model-Route-Controller pattern to ensure separation of concerns, scalability, and code maintainability:

```
                  ┌────────────────┐
                  │ Client Request │ (e.g. Postman, Browser)
                  └───────┬────────┘
                          │
                          ▼
                  ┌────────────────┐
                  │ Express Routes │ (src/routes)
                  │ Maps URLs/verb │
                  └───────┬────────┘
                          │
                          ▼
                  ┌────────────────┐
                  │  Controllers   │ (src/controllers)
                  │ Business Logic │
                  └───────┬────────┘
                          │
                          ▼
                  ┌────────────────┐
                  │    Models      │ (src/models)
                  │ Schema & DB    │
                  └───────┬────────┘
                          │
                          ▼
                  ┌────────────────┐
                  │ MongoDB Atlas  │ (Database)
                  └────────────────┘
```

1. **Routes (`backend/src/routes/`):** Define the API endpoints (URL paths and HTTP methods such as `POST`, `GET`, `PATCH`, `DELETE`) and forward the incoming requests to the appropriate controller function.
2. **Controllers (`backend/src/controllers/`):** Contain the core business logic. They extract and validate user input from `req.body` and `req.params`, interact with the Mongoose models, and return structured JSON responses with appropriate HTTP status codes.
3. **Models (`backend/src/models/`):** Define the schema, data types, validation constraints, and database hooks (such as pre-save password hashing) using Mongoose.

---

## ⚙️ Prerequisites

Before running the application, make sure you have:

- [Node.js](https://nodejs.org/) installed (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) (bundled with Node.js)
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) account
- [Postman](https://www.postman.com/) installed on your computer

---

## 🛠️ Step-by-Step Setup Guide

### 1. Clone and Open the Repository

```bash
git clone https://github.com/samridh25cse/Backend-Project-.git
cd Backend-Project-
```

### 2. Install Project Dependencies

Install all required dependencies using `npm`:

```bash
npm install
```

### 3. Configure MongoDB Atlas

1. Log in to your [MongoDB Atlas Console](https://cloud.mongodb.com/).
2. Create a free shared cluster (e.g., M0 tier) if you do not have one.
3. **Create Database User:**
   - Go to **Security > Database Access**.
   - Click **Add New Database User**.
   - Choose **Password** authentication.
   - Enter a username (e.g., `app_user`) and a secure password.
   - Set privileges to **Read and write to any database**.
   - Click **Add User**.
4. **Configure Network Access:**
   - Go to **Security > Network Access**.
   - Click **Add IP Address**.
   - Click **Allow Access from Anywhere** (`0.0.0.0/0`) or add your current IP address.
   - Click **Confirm**.
5. **Get Connection String:**
   - Go to **Deployment > Database**.
   - Click **Connect** next to your cluster.
   - Choose **Drivers** (Node.js).
   - Copy the connection string format:
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<username>` and `<password>` with the database user credentials you created.

### 4. Create the `.env` File

Create a file named `.env` in the root directory (at the same level as `package.json`):

```bash
# On Windows PowerShell
Copy-Item .env.example .env
```

Open `.env` and fill in your actual values:

```env
PORT=4000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

> **Note:** The database name `intro-to-backend` is automatically configured by the application via `backend/src/config/constants.js`. The `.env` file is excluded from Git via `.gitignore` to keep your credentials safe.

### 5. Start the Server

- **Development Mode (with auto-restart via Nodemon):**
  ```bash
  npm run dev
  ```

- **Production Mode:**
  ```bash
  npm start
  ```

When the database connects successfully, your terminal will display:
```
MongoDB connected successfully! DB HOST: cluster0-shard-00-00.xxxxx.mongodb.net
Server is running at port: 4000
```

---

## 🔗 API Endpoints Reference

Base URL: `http://localhost:4000`

### Health Check

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Confirms API is running | `200 OK` |

### User Authentication (`/api/v1/users`)

| Method | Endpoint | Description | Request Body | Success Status |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/users/register` | Register a new user | `{ username, email, password }` | `201 Created` |
| `POST` | `/api/v1/users/login` | Log in user with credentials | `{ email, password }` | `200 OK` |
| `POST` | `/api/v1/users/logout` | Stateless logout confirmation | `{ email }` | `200 OK` |

### Posts CRUD (`/api/v1/posts`)

| Method | Endpoint | Description | Request Body | Success Status |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/posts/create` | Create a new post | `{ name, description, age }` | `201 Created` |
| `GET` | `/api/v1/posts/getPosts` | Fetch all posts | _None_ | `200 OK` |
| `PATCH` | `/api/v1/posts/update/:id` | Update an existing post by ID | `{ name, description, age }` (partial) | `200 OK` |
| `DELETE` | `/api/v1/posts/delete/:id` | Delete a post by ID | _None_ | `200 OK` |

---

## 📬 Sample Requests and Responses

### 1. Register User
- **Method:** `POST`
- **URL:** `http://localhost:4000/api/v1/users/register`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response (`201 Created`):**
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": "673b5f9038d172e25d2c0001",
      "username": "john_doe",
      "email": "john@example.com"
    }
  }
  ```

### 2. Login User
- **Method:** `POST`
- **URL:** `http://localhost:4000/api/v1/users/login`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response (`200 OK`):**
  ```json
  {
    "message": "Login successful",
    "user": {
      "id": "673b5f9038d172e25d2c0001",
      "username": "john_doe",
      "email": "john@example.com"
    }
  }
  ```

### 3. Logout User
- **Method:** `POST`
- **URL:** `http://localhost:4000/api/v1/users/logout`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "email": "john@example.com"
  }
  ```
- **Response (`200 OK`):**
  ```json
  {
    "message": "Logout successful"
  }
  ```

### 4. Create Post
- **Method:** `POST`
- **URL:** `http://localhost:4000/api/v1/posts/create`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "name": "My First Post",
    "description": "This is my first backend project post",
    "age": 20
  }
  ```
- **Response (`201 Created`):**
  ```json
  {
    "message": "Post created successfully",
    "post": {
      "_id": "673b602138d172e25d2c0002",
      "name": "My First Post",
      "description": "This is my first backend project post",
      "age": 20,
      "createdAt": "2026-11-18T17:30:00.000Z",
      "updatedAt": "2026-11-18T17:30:00.000Z"
    }
  }
  ```

### 5. Get All Posts
- **Method:** `GET`
- **URL:** `http://localhost:4000/api/v1/posts/getPosts`
- **Response (`200 OK`):**
  ```json
  [
    {
      "_id": "673b602138d172e25d2c0002",
      "name": "My First Post",
      "description": "This is my first backend project post",
      "age": 20,
      "createdAt": "2026-11-18T17:30:00.000Z",
      "updatedAt": "2026-11-18T17:30:00.000Z"
    }
  ]
  ```

### 6. Update Post
- **Method:** `PATCH`
- **URL:** `http://localhost:4000/api/v1/posts/update/673b602138d172e25d2c0002`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "name": "Updated Post",
    "description": "This is my updated post",
    "age": 21
  }
  ```
- **Response (`200 OK`):**
  ```json
  {
    "message": "Post updated successfully",
    "post": {
      "_id": "673b602138d172e25d2c0002",
      "name": "Updated Post",
      "description": "This is my updated post",
      "age": 21,
      "createdAt": "2026-11-18T17:30:00.000Z",
      "updatedAt": "2026-11-18T17:35:00.000Z"
    }
  }
  ```

### 7. Delete Post
- **Method:** `DELETE`
- **URL:** `http://localhost:4000/api/v1/posts/delete/673b602138d172e25d2c0002`
- **Response (`200 OK`):**
  ```json
  {
    "message": "Post deleted successfully"
  }
  ```

---

## 🧪 Testing with Postman

A pre-configured Postman collection and environment are included in the `postman/` directory:

1. **Open Postman**.
2. Click **Import** in the top-left corner.
3. Drag and drop the following two files:
   - `postman/Backend_Project.postman_collection.json`
   - `postman/Backend_Project.postman_environment.json`
4. In the top-right environment selector in Postman, choose **Backend Project - Local Environment**.
5. The `baseUrl` variable is automatically set to `http://localhost:4000`.
6. **Execution Sequence:**
   - Run **Register User** (creates test user).
   - Run **Login User** (verifies credentials).
   - Run **Logout User** (tests stateless logout).
   - Run **Create Post** (creates a post and automatically stores its `_id` into the `postId` variable).
   - Run **Get All Posts** (lists all posts).
   - Run **Update Post** (uses the stored `postId`).
   - Run **Delete Post** (deletes the post using the stored `postId`).

Each request has automated assertions in its **Tests** tab to verify HTTP status codes and response bodies.

---

## 🔒 Security & Best Practices Implemented

- **Password Hashing:** Passwords are never stored in plain text. A Mongoose `pre("save")` hook hashes passwords using `bcrypt` with 10 salt rounds.
- **Credential Protection:** Passwords are removed via the `toJSON` method and controller projection so they are never leaked in API responses.
- **Environment Isolation:** Database credentials and port numbers are read strictly from `.env`, which is ignored by Git.
- **ObjectId Validation:** All ID parameters are verified with `mongoose.Types.ObjectId.isValid()` before querying to prevent cast exceptions.
- **Duplicate Prevention:** User email and username uniqueness are enforced both at the Mongoose schema level and within the controller.
- **Safe Server Bootstrapping:** The Express server starts listening only after the MongoDB connection is established.
- **Centralized Error Handling:** All routes are protected by Express middleware to prevent unhandled promise rejections from crashing the server.
