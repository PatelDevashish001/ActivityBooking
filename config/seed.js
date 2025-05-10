const mongoose = require('mongoose');
const Activity = require('../models/activity');
const activities = require('./seedData');
const connection = require('./db');

const seedActivities = async () => {
    try {
        await connection();
        
        await Activity.deleteMany({});
        console.log('Cleared existing activities');

        const createdActivities = await Activity.insertMany(activities);
        console.log(`Successfully seeded ${createdActivities.length} activities`);

    } catch (error) {
        console.error('Error seeding activities:', error);
        process.exit(1);
    } finally {
        try {
            await mongoose.disconnect();
            console.log('Database connection closed');
        } catch (error) {
            console.error('Error closing database connection:', error);
            process.exit(1);
        }
    }
};


seedActivities();
