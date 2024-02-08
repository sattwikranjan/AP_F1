const mongoose = require("mongoose");
const colors = require("colors");

const localDbPath =
  "mongodb+srv://backed:backend@cluster0.hvwz50o.mongodb.net/AP";
const connectDB = async () => {
  try {
    await mongoose.connect(localDbPath);
    console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Mongodb Server Issue ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
