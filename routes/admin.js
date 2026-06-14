const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');

// Get all enquiries
router.get('/enquiries', async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;