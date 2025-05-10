const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    activityId: {
        type: Number,
        required: true,
        ref: 'Activity'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['confirmed'],
        default: 'confirmed'
    },
    bookingDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for quick lookups by user and activity
bookingSchema.index({ userId: 1, activityId: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;