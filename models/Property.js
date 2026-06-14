const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  // Basic Info
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  
  // Categorization
  category: { 
    type: String, 
    enum: ['Residential', 'Commercial'],
    required: true 
  },
  listingType: {
    type: String,
    enum: ['Sale', 'Rent', 'Lease'],
    required: true
  },
  propertyType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Available', 'Sold', 'Rented', 'Leased'],
    default: 'Available'
  },
  
  // Location
  location: {
    area: { type: String },
    city: { type: String, default: 'Nashik' },
    fullAddress: { type: String },
    coordinates: { lat: Number, lng: Number }
  },
  
  // Pricing
  price: { type: Number, required: true },
  
  // Specifications
  specifications: {
    bhk: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    area: { type: Number, required: true },
    furnishing: {
      type: String,
      enum: ['Fully Furnished', 'Semi-Furnished', 'Unfurnished']
    },
    floor: { type: String },
    totalFloors: { type: Number },
    carParking: { type: Number, default: 0 }
  },
  
  // Media
  images: [{ type: String }],
  
  // Features
  amenities: [{ name: String, icon: String }],
  
  // Verification
  reraVerified: { type: Boolean, default: false },
  governmentVerified: { type: Boolean, default: false },
  reraNumber: { type: String },
  
  // Metadata
  views: { type: Number, default: 0 },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);