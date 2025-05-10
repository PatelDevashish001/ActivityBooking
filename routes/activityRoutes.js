const express = require('express');
const router = express.Router();
const { listActivities, getActivity } = require('../controller/activityController');

// Public routes
router.get('/', listActivities);


module.exports = router;