const express = require("express");
const router = express.Router();
const ComponentData = require("../models/ComponentData");

// GET latest component data
router.get("/latest", async (req, res) => {
  try {
    const data = await ComponentData.findOne().sort({ createdAt: -1 });
    if (!data) {
      return res.status(404).json({ message: "No component data found" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST new component data
router.post("/", async (req, res) => {
  try {
    const newData = new ComponentData(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    res.status(400).json({ error: "Invalid data format" });
  }
});

module.exports = router;
