# Performance Optimized Services

This repository contains two services:

1. **Auth Service**: Handles user registration, login, and token verification.
2. **Scam Reporting Service**: Allows users to report scams and check the status of a scam.


### Table of Contents
- [Project Setup](#project-setup)
- [Available Scripts](#available-scripts)
- [Endpoints](#endpoints)
- [What We Have Done](#what-we-have-done)

---

## Project Setup

To get started with the project, first clone the repository:

```bash
git clone https://github.com/your-repo/performance-optimized-services.git
cd performance-optimized-services
```

## Install dependencies:

```bash
yarn install
```

## Available Scripts

You can run the following commands to manage the application:
### Start auth-service:
```bash
yarn start:auth-service
```
Starts the auth-service using Nx.


### Start scam-service:
```bash
yarn start:scam-service
```
Starts the scam-service using Nx.

### Start both services concurrently:
```bash
yarn start:both
```
Runs both the auth-service and scam-service concurrently using concurrently package.

### Lint the project:
```bash
yarn lint
```
Runs linting on the entire project and fixes the issues automatically.

### Run tests:

```bash
yarn test
```
Runs tests 

### Build the project:

```bash
yarn build
```
Builds all the services in the project.


### Start services using Docker:

```bash
yarn start:docker
```

## Endpoints

### **Auth Service Endpoints**

- **POST /auth/register**
    - Register a new user.
    - **Body**: `{ "email": "user@example.com", "password": "securepassword" }`
    - **Response**: `201 Created` or `409 Conflict` if the user already exists.

- **POST /auth/login**
    - Authenticate a user and get a token.
    - **Body**: `{ "email": "user@example.com", "password": "securepassword" }`
    - **Response**: `200 OK` with JWT Token or `401 Unauthorized` if credentials are incorrect.

- **POST /auth/verify**
    - Verify the validity of a JWT token.
    - **Body**: `{ "token": "jwt_token_here" }`
    - **Response**: `{ "isValid": true/false }`.

- **GET /auth/get**
    - Test if the Auth service is running.
    - **Response**: `200 OK` with `{ message: "Auth services app is running fine" }`.

---

### **Scam Reporting Endpoints**

- **POST /scam/report-scam**
    - Report a new scam.
    - **Body**: `{ "type": "Phishing", "value": "test@example.com", "details": "Phishing attempt via email" }`
    - **Response**: `201 Created` or `200 OK` if the scam already exists.

- **GET /scam/scam-list**
    - Retrieve the list of top 10 most reported scams.
    - **Response**: `200 OK` with the list of scams sorted by report count.

- **GET /scam/scam-status**
    - Check if a value (e.g., email, phone number) is associated with a known scam.
    - **Query Params**: `value=<scam_value>`
    - **Response**: `200 OK` with `{ isScam: true/false, reports: <number> }`



## What We Have Done

### 1. **Auth Service**
- **User Registration**: Allows new users to register by providing an email and password.
- **Login & Authentication**: Verifies user credentials and generates a JWT token for authenticated sessions.
- **Token Verification**: Validates the JWT token to ensure a user is authenticated.

### 2. **Scam Reporting Service**
- **Report Scam**: Users can report a new scam or update an existing scam.
- **Scam Status**: Checks if a specific value (email, phone, etc.) is associated with a scam and returns the status.
- **Scam List**: Fetches a list of the top 10 most reported scams.

### 3. **Redis Integration**
- **Caching**: Utilizes Redis to cache scam statuses for quicker responses.
- **Connection**: Services are connected to Redis using Docker for caching purposes.

### 4. **MongoDB Integration**
- **Persistent Data**: MongoDB is used to store user and scam-related data persistently.
- **Error Handling**: Proper error handling and status codes for both services to provide feedback.

### 5. **Docker Support**
- **Docker-Compose**: The services can be run and built using Docker for easy deployment and scalability.

### 6. **Concurrency Support**
- **Run Both Services**: Using concurrently, both services can be run at the same time for development purposes.




