# Skilltenzo — Backend API

Backend API for Skilltenzo, an online course marketplace platform. Built as part of a full-stack web development course project.

## About the project

Skilltenzo allows users to browse courses, register and log in, add courses to a cart, complete purchases, and track their learning progress. This repository contains the backend REST API that powers the Skilltenzo frontend.

## Tech stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing

## Design

Figma: https://www.figma.com/design/W7dtWpgPOZxLfKmlHOM02V/Skilltenzo

## API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/refresh/session`

### Categories

- `GET /api/categories`

### Courses

- `GET /api/courses`
- `GET /api/courses/trending`
- `GET /api/courses/:slug`

### Cart

- `GET /api/cart`
- `POST /api/cart/:courseId`
- `DELETE /api/cart/:courseId`

### Orders

- `POST /api/orders`

### My Learning

- `GET /api/my-learning`
- `PATCH /api/my-learning/:courseId/complete`

## Running locally

1. Clone the repository
   \`\`\`bash
   git clone https://github.com/dianapri0303/skilltenzo-backend.git
   cd skilltenzo-backend
   \`\`\`

2. Install dependencies
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env` file based on `.env.example` and fill in your own values

4. (Optional) Seed the database with sample data
   \`\`\`bash
   node src/seed/importData.js
   \`\`\`

5. Start the development server
   \`\`\`bash
   npm run dev
   \`\`\`

Server runs on `http://localhost:3000` by default.

## Live deployment

Backend: https://skilltenzo-backend.onrender.com
