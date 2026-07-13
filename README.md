# Student Management System

A full-stack Student Management System built using **Spring Boot**, **Next.js**, and **Supabase PostgreSQL**.
The system provides secure student, course, and user management with JWT-based authentication and role-based authorization.

## 🚀 Project Overview

The Student Management System is designed to manage students, courses, and user accounts efficiently.

The application supports multiple user roles:

* **ADMIN**

  * Manage users
  * Manage students
  * Manage courses
  * Access system-wide information

* **STAFF**

  * Manage student information
  * Manage course-related operations

* **STUDENT**

  * View personal information
  * View enrolled courses

---

# 🏗️ System Architecture

```
                 Client Layer
                    |
              Next.js Frontend
                    |
              REST API Requests
                    |
             Spring Boot Backend
                    |
          Spring Security + JWT
                    |
          Supabase PostgreSQL Database
```

---

# 🛠️ Technologies Used

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Axios / Fetch API

## Backend

* Java
* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate
* Bean Validation

## Database

* PostgreSQL
* Supabase

## Development Tools

* IntelliJ IDEA
* VS Code
* Postman
* Git & GitHub

---

# ✨ Features

## Authentication

* User registration
* User login
* JWT token authentication
* Secure API endpoints
* Password encryption

## User Management

* Create users
* Manage user roles
* Enable/disable accounts

## Student Management

* Create students
* Update student information
* Delete students
* View student details
* Assign courses

## Course Management

* Create courses
* Update courses
* Delete courses
* Manage student-course relationships

---

# 🔐 Security Implementation

The backend uses Spring Security with JWT authentication.

Security features:

* Stateless authentication
* JWT request filtering
* Role-based authorization
* Protected REST endpoints
* BCrypt password encryption

Example roles:

```
ROLE_ADMIN
ROLE_STAFF
ROLE_STUDENT
```

---

# 🗄️ Database Design

## Users Table

Stores authentication and user information.

Fields:

| Field     | Description        |
| --------- | ------------------ |
| id        | User UUID          |
| firstName | User first name    |
| lastName  | User last name     |
| email     | Unique email       |
| phone     | User phone number  |
| password  | Encrypted password |
| role      | User role          |
| enabled   | Account status     |
| createdAt | Created date       |

## Students Table

Stores student profile information.

Fields:

| Field     | Description     |
| --------- | --------------- |
| id        | Student UUID    |
| user_id   | Related user    |
| address   | Student address |
| gender    | Student gender  |
| createdAt | Created date    |

## Courses Table

Stores course information.

Fields:

| Field       | Description     |
| ----------- | --------------- |
| id          | Course UUID     |
| courseName  | Course name     |
| description | Course details  |
| duration    | Course duration |
| fee         | Course fee      |
| status      | Course status   |

---

# 🔗 Entity Relationships

### User - Student

Relationship:

```
User 1 -------- 1 Student
```

A user account belongs to one student profile.

---

### Student - Course

Relationship:

```
Student * -------- * Course
```

A student can enroll in multiple courses.

A course can contain multiple students.

---

# 📂 Backend Structure

```
backend
│
├── controller
├── service
├── repository
├── entity
├── dto
├── security
├── exception
└── config
```

---

# 📂 Frontend Structure

```
frontend
│
├── app
├── components
├── services
├── hooks
├── types
└── utils
```

---

# ⚙️ Backend Setup

Clone repository:

```bash
git clone https://github.com/dilmin-dtecknow/student-management-system.git
```

Navigate:

```bash
cd backend
```

Configure database:

```
spring.datasource.url=YOUR_DATABASE_URL
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

Run application:

```bash
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

# ⚙️ Frontend Setup

Navigate:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create environment file:

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

Run application:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

# 📡 API Modules

## Authentication

```
POST /api/v1/auth/register

POST /api/v1/auth/login
```

## Users

```
GET    /api/users
POST   /api/users
PUT    /api/users/{id}
DELETE /api/users/{id}
```

## Students

```
GET    /api/students
POST   /api/students
PUT    /api/students/{id}
DELETE /api/students/{id}
POST   /api/students/{id}/courses
```

## Courses

```
GET    /api/courses
POST   /api/courses
PUT    /api/courses/{id}
DELETE /api/courses/{id}
```

---

# Swagger
```
http://localhost:8080/swagger-ui/index.html

```

# 🧪 Testing

API testing is performed using:

* Postman

Tested scenarios:

* User registration
* User login
* JWT authentication
* Role restrictions
* CRUD operations

---

# 🔮 Future Improvements

* Pagination
* Advanced search
* Email verification
* Forgot password
* Docker deployment
* Cloud hosting

---

# 👨‍💻 Author

**Dilmin Fernando**

Software Engineering

GitHub:
https://github.com/dilmin-dtecknow

---

# 📜 License

This project is developed for educational and internship evaluation purposes.
