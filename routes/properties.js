const express = require('express');
const router = express.Router();

// Temporary mock data until you add real properties
const mockProperties = [
  {
    _id: '1',
    title: 'Sunrise Heights',
    slug: 'sunrise-heights',
    category: 'Residential',
    listingType: 'Sale',
    price: 4500000,
    location: { area: 'Panchavati', city: 'Nashik' },
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'],
    specifications: { bhk: 2, area: 1200 }
  },
  {
    _id: '2',
    title: 'Business Plaza',
    slug: 'business-plaza',
    category: 'Commercial',
    listingType: 'Sale',
    price: 15000000,
    location: { area: 'CBD', city: 'Nashik' },
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'],
    specifications: { area: 1500 }
  }
];

// Public routes
router.get('/', (req, res) => {
  res.json(mockProperties);
});

router.get('/:slug', (req, res) => {
  const property = mockProperties.find(p => p.slug === req.params.slug);
  if (!property) return res.status(404).json({ message: 'Property not found' });
  res.json(property);
});

module.exports = router;