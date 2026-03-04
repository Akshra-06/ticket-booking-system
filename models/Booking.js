const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true
  },

  seatNumber: {
  type: String,
  required: true,
  unique: true
},

  user: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Booking", bookingSchema);