const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/students", studentRoutes);

// Basic route for testing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Student Self Service API" });
});

// Define port
const PORT = process.env.PORT || 8000;

// MongoDB connection string (using the one from .env)
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB with updated options
mongoose
  .connect(MONGODB_URI, {
    // These options are no longer needed in Mongoose 8 but won't hurt
    retryWrites: true,
    w: "majority",
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    // Start server only after successful connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });

// Handle MongoDB connection errors after initial connection
mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});
