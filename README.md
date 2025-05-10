# Activity Booking System

A Node.js application for managing activity bookings with user authentication.

## Features

- User Authentication (Register/Login)
- Activity Listing
- Activity Booking
- Booking Management
- JWT-based Authorization

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT for authentication

## Setup

1. Clone the repository
```bash
git clone <repository-url>
cd ActivityBooking
```

2. Install dependencies
```bash
npm install
```

3. Environment Setup
- Copy `.env.example` to `.env`
- Update the values in `.env` with your configuration
```bash
cp .env.example .env
```

4. Seed the database with sample activities
```bash
npm run seed
```

5. Start the server
```bash
npm start
```

## API Endpoints

### Auth Routes
- POST /auth/register - Register new user
- POST /auth/login - Login user

### Activity Routes
- GET /activity - List all activities


### Booking Routes (Protected)
- POST /booking/book - Book an activity
- GET /booking/my-bookings - Get user's bookings


## Environment Variables

- PORT - Server port (default: 3003)
- MONGO_URI - MongoDB connection string
- JWT_SECRET - Secret key for JWT signing
- NODE_ENV - Environment (development/production)

## License

MIT
