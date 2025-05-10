const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    activityId: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: [true, 'Activity title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Activity description is required'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Activity location is required'],
        trim: true
    },
    dateTime: {
        type: Date,
        required: [true, 'Activity date and time is required']
    },
    capacity: {
        type: Number,
        required: [true, 'Activity capacity is required'],
        min: [1, 'Capacity must be at least 1']
    },
    availableSpots: {
        type: Number,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Pre-save middleware to set initial availableSpots
activitySchema.pre('save', function(next) {
    if (this.isNew) {
        this.availableSpots = this.capacity;
    }
    next();
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;