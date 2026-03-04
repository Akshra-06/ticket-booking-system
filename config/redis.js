const redis = require("redis");

const client = redis.createClient({
  url: process.env.REDIS_URL,
  socket: {
    tls: true
  }
});

client.on("error", (err) => {
  console.log("Redis Error:", err);
});

async function connectRedis() {
  await client.connect();
  console.log("Redis Connected");
}

connectRedis();

module.exports = client;