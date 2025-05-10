const Booking = require('../models/booking');
const Activity = require('../models/activity');


exports.bookActivity = async (req, res) => {
    try {
        const { activityId } = req.body;
  
        const activity = await Activity.findOne({ activityId });
        if (!activity) {
            return res.status(404).json({
                success: false,
                message: 'Activity not found'
            });
        }

        // Check if activity date has passed
        if (new Date(activity.dateTime) < new Date()) {
            return res.status(400).json({
                success: false,
                message: 'Cannot book past activities'
            });
        }

        // Check if user already has a booking for this activity
        const existingBooking = await Booking.findOne({
            userId: req.user.id,
            activityId: activity.activityId,
            status: 'confirmed'
        });

        if (existingBooking) {
            return res.status(400).json({
                success: false,
                message: 'You have already booked this activity'
            });
        }

        // Create new booking
        const booking = new Booking({
            userId: req.user.id,
            activityId: activity.activityId,
            status: 'confirmed'
        });

        await booking.save();

        res.status(201).json({
            success: true,
            message: 'Booking successful',
            data: {
                bookingId: booking._id,
                activityId: activity.activityId,
                activityName: activity.title,
                dateTime: activity.dateTime,
                location: activity.location
            }
        });

    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing booking'
        });
    }
};


exports.getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ 
            userId: req.user.id 
        }).sort({ createdAt: -1 });

  
        const bookingsWithDetails = await Promise.all(
            bookings.map(async (booking) => {
                const activity = await Activity.findOne({ activityId: booking.activityId });
                return {
                    bookingId: booking._id,
                    status: booking.status,
                    bookingDate: booking.createdAt,
                    activity: {
                        id: activity.activityId,
                        title: activity.title,
                        dateTime: activity.dateTime,
                        location: activity.location
                    }
                };
            })
        );

        res.json({
            success: true,
            count: bookings.length,
            data: bookingsWithDetails
        });

    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching bookings'
        });
    }
};