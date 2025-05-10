const express = require('express');
const router = express.Router();
const { bookActivity, getMyBookings } = require('../controller/bookingController');
const verifyToken = require('../middleware/auth');

// All routes require authentication
router.use(verifyToken);
// Get user's bookings
router.get('/my-bookings', getMyBookings);

// Book an activity
router.post('/book', bookActivity);
module.exports = router;