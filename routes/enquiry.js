const express = require('express');
const router = express.Router();

// Temporary storage
let enquiries = [];

// GET all enquiries
router.get('/', (req, res) => {
  res.json(enquiries);
});

// POST new enquiry
router.post('/', (req, res) => {
  const enquiry = {
    ...req.body,
    _id: Date.now().toString(),
    createdAt: new Date(),
    status: 'New'
  };
  enquiries.push(enquiry);
  console.log('New enquiry received:', enquiry.name);
  res.status(201).json(enquiry);
});

module.exports = router;