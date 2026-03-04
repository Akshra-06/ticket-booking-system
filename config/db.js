const mongoose = require("mongoose");

const connectDB = async () => {
  try {

    await mongoose.connect(
      "mongodb+srv://akshraahuja06_db_user:Str%40ng3r@cluster0.oudraf1.mongodb.net/ticketDB?retryWrites=true&w=majority"
    );

    console.log("MongoDB Atlas Connected");

  } catch (error) {

    console.error("MongoDB connection error:", error);

  }
};

module.exports = connectDB;