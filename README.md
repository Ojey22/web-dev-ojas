# Intro to Backend Development - My freeCodeCamp YouTube Tutorial

hi there, this repository contains the code for my "Intro to Backend Development" video tutorial published on the freeCodeCamp YouTube channel!

➡️ Watch me teach the full tutorial here: [Link](https://www.youtube.com/watch?v=KOutPbKc9UM&t=4194s)
➡️ NOTES: [Link](https://excalidraw.com/#json=MZ-nK2h_8IKWFL0Nm1gxH,QJrqIq4vpqwtzvjh4YMFIA)

## ☑️ What You'll Learn in this video

- Learn what a backend is and its core components.
- Set up a complete Node.js development environment and project structure.
- Connect a Node.js application to a database (e.g., MongoDB).
- Basic HTTP Fundamentals for building APIs.
- Create Mongoose models for Users and Posts.
- Build a basic authentication system with Register, Login, and Logout endpoints.
- Implement complete CRUD (Create, Read, Update, Delete) APIs for posts.

## How to run this code and test the APIs

### To get a local copy up and running, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/NewSmoke38/intro-to-backend
   ```

2. Install all the Dependencies:
   ```
   npm install
   ```

3. Set up your environment variables:
   - Create a new file in the root of the project named `.env`
   - Copy the contents from the example below and add your own values (like your database connection string).
   
   ```
   PORT=4000
   MONGODB_URI="your_mongodb_connection_string_here"
   ```

4. Start the Server:
   ```
   npm run dev
   ```

The application will be running on http://localhost:4000 (or the port you specified in your .env file).

---

## 📁 Project Structure

```
backend-project/
├── backend/
│   └── src/
│       ├── app.js                      # Express app setup + route declarations
│       ├── index.js                    # Entry point: load env, connect DB, start server
│       ├── config/
│       │   ├── constants.js            # DB_NAME constant
│       │   └── database.js             # MongoDB connection logic
│       ├── controllers/
│       │   ├── post.controller.js      # CRUD logic for posts
│       │   └── user.controller.js      # Register, Login, Logout logic
│       ├── models/
│       │   ├── post.model.js           # Mongoose schema for Post
│       │   └── user.model.js           # Mongoose schema for User (with bcrypt hashing)
│       └── routes/
│           ├── post.route.js           # Post API routes
│           └── user.route.js           # User API routes
├── .env                                # Environment variables (NOT committed to git)
├── .gitignore
├── package.json
└── README.md
```

---

## 🔗 API Endpoints

### Users (`/api/v1/users`)

| Method | Endpoint                       | Description      |
|--------|--------------------------------|------------------|
| POST   | `/api/v1/users/register`       | Register a user  |
| POST   | `/api/v1/users/login`          | Login a user     |
| POST   | `/api/v1/users/logout`         | Logout a user    |

**Register body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "mypassword"
}
```

**Login body:**
```json
{
  "email": "john@example.com",
  "password": "mypassword"
}
```

---

### Posts (`/api/v1/posts`)

| Method | Endpoint                        | Description       |
|--------|---------------------------------|-------------------|
| POST   | `/api/v1/posts/create`          | Create a post     |
| GET    | `/api/v1/posts/getPosts`        | Get all posts     |
| PATCH  | `/api/v1/posts/update/:id`      | Update a post     |
| DELETE | `/api/v1/posts/delete/:id`      | Delete a post     |

**Create post body:**
```json
{
  "name": "My First Post",
  "description": "This is a test post",
  "age": 25
}
```

---

## 🏗️ Architecture: Model-Route-Controller (MRC)

```
Request → Route → Controller → Model → Database
                                     ↓
Response ←──────────────────── Controller
```

⭐ If you found this tutorial helpful, please consider giving this repository a star!
