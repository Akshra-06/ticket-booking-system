const Booking = require("../models/Booking");
const { v4: uuidv4 } = require("uuid");
const { lockSeat } = require("../services/seatLockService");

exports.bookSeat = async (req, res) => {

    const { seatNumber, user } = req.body;

    const locked = await lockSeat(seatNumber);

    if (!locked) {

        await Booking.create({
            bookingId: uuidv4(),
            seatNumber,
            user,
            status: "FAILED"
        });

        return res.status(400).json({
            success: false,
            message: "Seat already locked"
        });
    }

    try {

        const existing = await Booking.findOne({
            seatNumber,
            status: "SUCCESS"
        });

        if (existing) {

            await Booking.create({
                bookingId: uuidv4(),
                seatNumber,
                user,
                status: "FAILED"
            });

            return res.status(400).json({
                success: false,
                message: "Seat already booked"
            });
        }

        const booking = new Booking({
            bookingId: uuidv4(),
            seatNumber,
            user,
            status: "SUCCESS"
        });

        await booking.save();

        res.json({
            success: true,
            bookingId: booking.bookingId,
            remaining: 99
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Booking failed"
        });
    }
};