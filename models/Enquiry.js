const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  interestedIn: { type: String, enum: ['Residential', 'Commercial', 'General'], default: 'General' },
  propertyId: { type: String },
  propertyName: { type: String },
  userId: { type: String },
  status: { type: String, enum: ['New', 'In Progress', 'Completed'], default: 'New' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enquiry', enquirySchema);