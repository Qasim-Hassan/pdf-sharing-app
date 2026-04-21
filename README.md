# 📄 PDF Social Network

A modern, full-stack social networking platform built for sharing knowledge through PDFs — think microblogging, but instead of text posts, you share meaningful documents with your audience.

---

## 🚀 Overview

**PDF Social Network** is a content-sharing platform where users can upload and distribute PDF files to their subscribers. Inspired by platforms like Twitter/X, this app focuses on *high-value, document-based content* rather than short-form text.

Users can:

* Create accounts and manage profiles
* Upload and share PDF files
* Add titles and descriptions to posts
* Subscribe to other users
* View content exclusively from creators they follow

---

## 🧱 Tech Stack

### Backend

* **FastAPI** — high-performance Python web framework
* **PostgreSQL** — robust relational database
* **Alembic** — database migrations

### Frontend

* **React (TypeScript)** — scalable and type-safe UI development

---

## ✨ Features

### 👤 Authentication & User Management

* Secure user registration and login
* Profile management
* Subscription system (follow/unfollow users)

### 📤 PDF Sharing

* Upload PDF documents
* Add title and description to each post
* Store and retrieve files efficiently

### 🔒 Subscriber-Only Content

* Posts are visible **only to subscribers**
* Controlled content access for creators

### 🔄 Full CRUD Functionality

* Create, read, update, and delete posts
* Manage user accounts and subscriptions

---

## ⚙️ Setup & Installation

### 🛠️ Configure

In the backend directory, create a file named:

<pre>.env</pre>

Fill the ".env" file using this template (replace the values with your owm):
```
DB_HOSTNAME = localhost
DB_NAME = your_db_name
DB_USERNAME = postgres
DB_PASSWORD = your_db_password
DB_PORT = 5432
DB_URL = your_db_connection_string #OPTIONAL
SECRET_KEY = your_secret_key
ALGORITHM = HS256
ACCESS_TOKEN_EXPIRE_MINUTES = 30
```


--- 

### 🔧 Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # (or venv\Scripts\activate on Windows)

pip install -r requirements.txt

# Run migrations
alembic upgrade head

# Start server
uvicorn app.main:app --reload
```

Backend runs on: `http://localhost:8000`

---

### 💻 Frontend Setup

```bash
cd frontend
npm install --audit-level=high
npm run dev
```

Frontend runs on: `http://localhost:5173` (or configured port)
[Note: Use "npm install --audit-level=high" to ensure you don't install a package with "high" vulnerability.

---

## 🔌 API Highlights

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| POST   | `/users`         | Create account       |
| GET    | `/users/{id}`    | View existing account|
| POST   | `/login`         | Login user           |
| GET    | `/posts`         | View subscribed posts|
| GET    | `/posts/{id}`    | Get a subscribed post|
| POST   | `/posts`         | Create new PDF post  |
| PUT    | `/posts/{id}`    | Update post          |
| DELETE | `/posts/{id}`    | Delete post          |
| POST   | `/subscription`  | (Un)Subscribe a post |

---

## 📦 Database

* PostgreSQL used for persistent storage
* Alembic handles schema migrations
* Structured relationships for:

  * Users
  * Posts
  * Subscriptions

---

## 🔐 Access Control Logic

* Users can **only view posts from accounts they subscribe to**
* Content visibility is strictly enforced at the API level
* Ensures privacy and controlled distribution

---

## 🎯 Use Cases

* Sharing research papers
* Distributing study material
* Publishing reports or whitepapers
* Exclusive content sharing for niche communities

---

## 🚧 Future Improvements

* Likes, comments, and engagement metrics
* File previews (PDF viewer integration)
* Notifications system
* Better UI/Layout
* Mobile responsiveness improvements

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

* Fork the repository
* Create a feature branch
* Submit a pull request

---

## 🛡️ License

This project is licensed under the MIT License.

---

## 💡 Final Note

This project reimagines social networking by prioritizing **substance over noise** — making it easier to share meaningful, long-form content in a controlled and community-driven environment.

---

> “Less scrolling, more learning.”
