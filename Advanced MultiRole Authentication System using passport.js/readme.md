MultiRole Authentication System using Passport.js
A RESTful API for user authentication with role-based access control, built with Node.js, Express, MongoDB, and Passport.js.

Features
Complete authentication flow (register, login, profile)
Role-based access control (admin, manager, user)
JWT authentication with Passport.js
Password hashing with bcrypt
Input validation
Account management (activation/deactivation)
User profile management
Secure password changing

Technologies Used
Node.js
Express.js
MongoDB
Passport.js (JWT strategy)
JSON Web Tokens (JWT)
bcrypt.js
express-validator

Project Structure
├── .env                  # Environment variables
├── app.js                # Application entry point
├── config/               # Configuration files
│   ├── db.js             # Database connection
│   ├── passport.js       # Passport.js configuration
│   └── roles.js          # Role definitions
├── controllers/          # Request handlers
│   └── authController.js 
├── middlewares/          # Custom middlewares
│   ├── authMiddleware.js # JWT authentication middleware
│   └── roleCheckMiddleware.js # Role verification
├── models/               # Database models
│   └── User.js           # User model with schema
├── routes/               # API routes
│   ├── adminRoutes.js    # Admin-specific routes
│   ├── authRoutes.js     # Authentication routes
│   └── userRoutes.js     # User-specific routes
└── utils/                # Utility functions
    └── validation.js     # Input validation

API Endpoints:
Authentication
POST /api/auth/register - Register a new user
POST /api/auth/login - Login user
GET /api/auth/profile - Get user profile (authenticated)

User Routes
PATCH /api/user/profile - Update user profile (authenticated)
PATCH /api/user/change-password - Change password (authenticated)

Admin Routes
GET /api/admin/users - Get all users (admin only)
PATCH /api/admin/users/:id/role - Update user role (admin only)
PATCH /api/admin/users/:id/status - Activate/deactivate user (admin only)

Setup and Installation
Clone the repository
Install dependencies

License
ISC

Author
Siddharth