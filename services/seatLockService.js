const redisClient = require("../config/redis");

const LOCK_TIME = 10; // seconds

async function lockSeat(seatNumber) {

    const key = `seat_lock:${seatNumber}`;

    const result = await redisClient.set(
        key,
        "locked",
        {
            NX: true,
            EX: LOCK_TIME
        }
    );

    return result === "OK";
}

async function unlockSeat(seatNumber) {

    const key = `seat_lock:${seatNumber}`;

    await redisClient.del(key);
}

module.exports = {
    lockSeat,
    unlockSeat
};