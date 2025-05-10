const Activity = require('../models/activity');

// List all activities (Public endpoint)
exports.listActivities = async (req, res) => {
    try {
        const activities = await Activity.find()
            .select('activityId title description location dateTime capacity availableSpots')
            .sort({ dateTime: 1 }) // Sort by date in ascending order

        res.json({
            success: true,
            data: activities.map(activity => ({
                id: activity._id,
                title: activity.title,
                description: activity.description,
                location: activity.location,
                dateTime: activity.dateTime,
                capacity: activity.capacity,
                availableSpots: activity.availableSpots
            }))
        });
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching activities'
        });
    }
};

