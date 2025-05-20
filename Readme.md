# 🔐 UserPort API

**UserPort** is a simple and developer-friendly authentication backend API built with Node.js and Express. It provides essential user authentication and profile management endpoints, ideal for frontend developers to test login flows.

---

## 📦 Base URL **/v1**

---

## 📚 API Endpoints

### 🔑 Authentication Routes

#### ✅ Sign Up

**POST** `/auth/signup`

Registers a new user.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Success Response:**

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

#### 🔐 Sign In

**POST** `/auth/signin`

Authenticates an existing user.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Success Response:**

```json
{
  "message": "Login successful",
  "token": "jwt_token"
}
```

---

#### 🚪 Sign Out

**GET** `/auth/signout`

Logs out the currently authenticated user.

- Requires authentication via token (usually via cookies or headers).
- If not authenticated, returns an authentication error.

**Success Response:**

```json
{
  "message": "User signed out successfully",
  ....
}
```

---

### 👤 User Routes

#### 📄 Get User Profile

**GET** `/users/me`

Fetch the authenticated user’s profile.

- Requires authentication.

**Success Response:**

```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    ....
  }
}
```

---

#### ✏️ Update User Name

**PUT** `/users/me`

Update only the user’s name.

**Request Body:**

```json
{
  "name": "New Name"
}
```

**Success Response:**

```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "user_id",
    "name": "New Name",
    "email": "john@example.com",
    ....
  }
}
```

---

#### ✏️ Change Password

**PUT** `/users/change-password`

User can change password

**Request Body:**

```json
{
  "oldPassword": "********",
  "newPassword": "********"
}
```

**Success Response:**

```json
{
  "message": "Password Changed successfully",
  "user": {
    "id": "user_id",
    "name": "New Name",
    "email": "john@example.com"
    ....
  }
}
```

---

#### ❌ Delete User Account

**DELETE** `/users/me`

Deletes the authenticated user's account permanently.

**Success Response:**

```json
{
  "message": "User account deleted successfully"
}
```

---

## 🛡️ Authentication

All protected routes require the user to be authenticated via a valid token (usually sent in headers or cookies depending on your implementation).

---

### ⏰ Automatic User Deletion (Cron Job)

UserPort includes a scheduled background task that **deletes all user accounts every 24 hours**. This is useful for testing environments where persistent data is not required.

- The cleanup runs **daily at midnight (00:00)** server time.
- This is handled using a `node-cron` job.
- ⚠️ **All user accounts will be permanently removed**.

## 🛠️ Tech Stack

- Node.js
- Express.js
- Zod for validation
- JWT for authentication

---

## 📄 License

MIT

---

## 🤝 Contributing

Feel free to open issues or pull requests for feature suggestions, bug fixes, or enhancements.

---
