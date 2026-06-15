const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// In-memory storage (for demo)
let users = [];
let enquiries = [];

// ============ AUTH ROUTES (NO /api prefix) ============

// Signup
app.post('/auth/signup', (req, res) => {
  console.log('Signup request received:', req.body);
  
  const { name, email, phone, password } = req.body;
  
  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  // Create new user
  const newUser = {
    id: users.length + 1,
    name,
    email,
    phone,
    password,
    role: 'user',
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  console.log('User created:', newUser);
  
  res.status(201).json({
    success: true,
    message: 'User created successfully',
    user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
  });
});

// Login
app.post('/auth/login', (req, res) => {
  console.log('Login request received:', req.body);
  
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  
  res.json({
    success: true,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
});

// Get all users (for testing)
app.get('/auth/users', (req, res) => {
  const usersWithoutPassword = users.map(({ password, ...rest }) => rest);
  res.json(usersWithoutPassword);
});

// ============ ENQUIRY ROUTES ============

app.post('/enquiries', (req, res) => {
  const enquiry = {
    id: enquiries.length + 1,
    ...req.body,
    createdAt: new Date().toISOString(),
    status: 'New'
  };
  enquiries.push(enquiry);
  console.log('Enquiry received:', enquiry);
  res.status(201).json(enquiry);
});

app.get('/enquiries', (req, res) => {
  res.json(enquiries);
});

// ============ PROPERTY ROUTES ============

// Sample properties data
const properties = [
  { 
    id: 1, 
    title: 'Sunrise Heights', 
    category: 'Residential', 
    price: 4500000, 
    location: 'Panchavati', 
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500'],
    bedrooms: 3,
    area_sqft: 1450,
    listingType: 'Sale',
    propertyType: 'Apartment'
  },
  { 
    id: 2, 
    title: 'Business Plaza', 
    category: 'Commercial', 
    price: 15000000, 
    location: 'CBD', 
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=500'],
    area_sqft: 1500,
    listingType: 'Sale',
    propertyType: 'Office Space'
  },
  { 
    id: 3, 
    title: 'Green Valley Villas', 
    category: 'Residential', 
    price: 12000000, 
    location: 'College Road', 
    images: ['https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=500'],
    bedrooms: 4,
    area_sqft: 2200,
    listingType: 'Sale',
    propertyType: 'Villa'
  },
  { 
    id: 4, 
    title: '2 BHK Flat for Rent', 
    category: 'Residential', 
    price: 25000, 
    location: 'Panchavati', 
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500'],
    bedrooms: 2,
    area_sqft: 950,
    listingType: 'Rent',
    propertyType: 'Apartment'
  }
];

app.get('/properties', (req, res) => {
  res.json(properties);
});

app.get('/properties/:id', (req, res) => {
  const property = properties.find(p => p.id == req.params.id);
  if (property) {
    res.json(property);
  } else {
    res.status(404).json({ message: 'Property not found' });
  }
});

// ============ DEFAULT ROUTE ============
app.get('/', (req, res) => {
  res.json({ message: 'Swabhagya Reality API is running' });
});

// ============ START SERVER ============
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 API ready at http://localhost:${PORT}`);
  console.log(`✅ Auth routes: /auth/signup, /auth/login`);
  console.log(`📊 Properties: ${properties.length} properties loaded`);
});