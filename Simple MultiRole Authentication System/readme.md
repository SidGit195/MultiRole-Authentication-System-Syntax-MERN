Multi-Role Authentication System
A simple authentication system with role-based access control built using Express.js and MongoDB.

Features
1. User registration and login
2. JWT-based authentication
3. Role-based access control (user and admin roles)
4. Protected routes for authenticated users
5. Admin-only routes

Technologies Used
1. Node.js
2. Express.js
3. MongoDB with Mongoose
4. JSON Web Tokens (JWT)
5. bcryptjs for password hashing

Project Structure
.
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── app.js                  # Main application file
├── config/
│   └── db.js               # Database configuration
├── controllers/
│   └── authController.js   # Authentication controller
├── middlewares/
│   ├── authMiddleware.js   # Authentication middleware
│   └── roleMiddleware.js   # Role-based access middleware
├── models/
│   └── userModel.js        # User model schema
├── package.json            # Project dependencies
└── routes/
    └── authRoutes.js       # Authentication routes

Setup and Installation
Clone the repository
Install dependencies

API Endpoints:

Public Routes
POST /api/register - Register a new user
POST /api/login - Log in a user

Protected Routes
GET /api/user-dashboard - User dashboard (requires authentication)
GET /api/admin-dashboard - Admin dashboard 
(requires admin role)

License
ISC

Author
Siddharth