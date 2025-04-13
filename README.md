# Student Management System

A comprehensive student management system built with Next.js frontend and microservices backend architecture.

## Project Overview

This application consists of:
- Next.js frontend
- Authentication service
- Course service
- Grade service
- MongoDB database

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode

Run the entire application stack with Docker Compose:

```bash
docker-compose build
docker-compose up
```

This will start:
- Frontend at http://localhost:3000
- Auth Service at http://localhost:5001
- Course Service at http://localhost:5002
- Grade Service at http://localhost:5003
- MongoDB at localhost:27017

To run individual services:

```bash
# Frontend only
npm run dev

# Individual services (from their respective directories)
cd src/app/services/auth
npm run dev

cd src/app/services/course
npm run dev

cd src/app/services/grade
npm run dev
```

## Service Architecture

| Service | Port | Description |
|---------|------|-------------|
| Frontend | 3000 | Next.js web application |
| Auth Service | 5001 | Handles user authentication |
| Course Service | 5002 | Manages course information |
| Grade Service | 5003 | Manages student grades |
| MongoDB | 27017 | Database for all services |

## Environment Variables

The project uses the following environment variables:

- Frontend:
    - `AUTH_SERVICE_URL`
    - `COURSE_SERVICE_URL`
    - `GRADE_SERVICE_URL`

- Auth Service:
    - `PORT`
    - `JWT_SECRET`
    - `MONGO_URI`

- Course/Grade Services:
    - `PORT`
    - `MONGO_URI`

## Technologies Used

- **Frontend**: Next.js, React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Containerization**: Docker, Docker Compose