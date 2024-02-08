const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db");
const teacherModel = require("./models/teacherModel");

//mongodb connection
connectDB();

//rest objects
const app = express();

//middlewares
app.use(express.json());

//routes
app.use("/api", require("./routes/userRoutes"));

//port
const port = 8080;

//listen port
app.listen(port, () => {
  console.log(
    `Server running in development Mode on Port ${port}`.bgCyan.white
  );
});
