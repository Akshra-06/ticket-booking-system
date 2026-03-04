const express = require("express");
const router = express.Router();

const { bookSeat } = require("../controllers/bookingController");

router.post("/book", bookSeat);

module.exports = router;