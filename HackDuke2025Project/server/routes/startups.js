const express = require('express');
const { ObjectId } = require('mongodb');
const startup = require('../models/startupaccount');

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get a list of all the startups.
router.get("/", async (req, res) => {
  try {
    const startups = await startup.find();
    res.json(startups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// This section will help you create a new startup.
router.post("/create", async (req, res) => {
  try {
    // Check if startup with same ID already exists
    const existingStartup = await startup.findOne({ startupID: req.body.startupID });
    if (existingStartup) {
      return res.status(400).json({ error: "A startup with this ID already exists" });
    }

    const newStartup = new startup(req.body);
    await newStartup.save();
    res.status(201).json(newStartup);
  } catch (error) {
    console.error("Error in POST /startups:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// This section will help you get a single startup by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const singleStartUp = await startup.findById(id);  // Use correct model `startup`
    
    if (!singleStartUp) {
      return res.status(404).json({ error: "Startup not found" });
    }
    
    res.status(200).json(singleStartUp);
  } catch (error) {
    console.error("Error in GET /startups/:id:", error);  // Log the error details
    res.status(500).json({ error: "Internal server error" });
  }
});

// This section will help you update a startup by id
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStartup = await startup.findByIdAndUpdate(id, req.body, { new: true });  // Use correct model `startup`
    
    if (!updatedStartup) {
      return res.status(404).json({ error: "Startup not found" });
    }
    
    res.status(200).json(updatedStartup);
  } catch (error) {
    console.error("Error in PATCH /startups/:id:", error);  // Log the error details
    res.status(500).json({ error: "Internal server error" });
  }
});

// This section will help you delete a startup by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStartup = await startup.findByIdAndDelete(id);  // Use correct model `startup`
    
    if (!deletedStartup) {
      return res.status(404).json({ error: "Startup not found" });
    }
    
    res.status(200).json({ message: "Startup deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE /startups/:id:", error);  // Log the error details
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
