require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const Booking = require("./models/Booking");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(express.json());

connectDB();
app.get("/", (req, res) => {
  res.send("Concurrent Ticket Booking System is running 🚀");
});

app.use("/api", bookingRoutes);

app.get("/", (req, res) => {
  res.send("Ticket Booking System Running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/bookings", async (req, res) => {

    const bookings = await Booking.find();

    let html = `
    <h1>Concurrent Ticket Booking Results</h1>

    <table border="1" cellpadding="10">
    <tr>
        <th>User</th>
        <th>Seat</th>
        <th>Status</th>
        <th>Booking ID</th>
    </tr>
    `;

    bookings.forEach(b => {

        const color = b.status === "SUCCESS" ? "green" : "red";

        html += `
        <tr>
            <td>${b.user}</td>
            <td>${b.seatNumber}</td>
            <td style="color:${color}; font-weight:bold;">
                ${b.status}
            </td>
            <td>${b.bookingId}</td>
        </tr>
        `;
    });

    html += "</table>";

    res.send(html);
});
