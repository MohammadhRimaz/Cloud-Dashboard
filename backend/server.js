const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const componentRoutes = require("./routes/components");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/components", componentRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
