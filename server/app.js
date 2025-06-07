 // Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const mongoose = require('mongoose');
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler")
const authRouter = require("./routes/auth.routes");

mongoose 
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api") 
  .then(() => console.log("Connected to MongoDB")) 
  .catch((error) => console.error("MongoDB connection error:", error)); 


// imported dynamic routes
const cohortRoutes = require("./routes/cohorts.routes");
const studentRoutes = require("./routes/students.routes");

                    
// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
const cors = require("cors");

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());


// activate route in User.routes
const userRouter = require("./routes/user.routes");
app.use("/api/users", userRouter);
app.use("/auth", authRouter);

// added dynamic routes
app.use("/api/cohorts", cohortRoutes);
app.use("/api/students", studentRoutes);

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
app.get("/", (req, res) => {
  res.redirect("/docs");
});

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});



app.use(notFoundHandler);
app.use(errorHandler);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
