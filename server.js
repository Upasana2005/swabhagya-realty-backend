const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Allow all origins for testing (fix CORS)
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());

// In-memory storage
let users = [];
let enquiries = [];

// ============ AUTH ROUTES ============

// Signup
app.post('/auth/signup', (req, res) => {
  console.log('✅ Signup request received:', req.body);
  
  const { name, email, phone, password } = req.body;
  
  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    console.log('❌ User already exists:', email);
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
  console.log('✅ User created successfully:', newUser);
  console.log('📊 Total users:', users.length);
  
  res.status(201).json({
    success: true,
    message: 'User created successfully',
    user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
  });
});

// Login
app.post('/auth/login', (req, res) => {
  console.log('✅ Login request received:', req.body);
  
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    console.log('❌ Invalid credentials for:', email);
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  
  console.log('✅ Login successful:', user.email);
  
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
  console.log('✅ Enquiry received:', enquiry);
  res.status(201).json(enquiry);
});

app.get('/enquiries', (req, res) => {
  res.json(enquiries);
});

// ============ PROPERTY ROUTES ============

const properties = [
  { id: 1, title: 'Sunrise Heights', category: 'Residential', price: 4500000, location: 'Panchavati', images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500'], bedrooms: 3, area_sqft: 1450, listingType: 'Sale', propertyType: 'Apartment', status: 'ongoing' },
  { id: 2, title: 'Green Valley House', category: 'Residential', price: 8500000, location: 'College Road', images: ['https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=500'], bedrooms: 4, area_sqft: 2200, listingType: 'Sale', propertyType: 'Independent House', status: 'completed' },
  { id: 3, title: 'Business Plaza', category: 'Commercial', price: 15000000, location: 'CBD', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=500'], area_sqft: 1500, listingType: 'Sale', propertyType: 'Office Space', status: 'completed' }
];

app.get('/properties', (req, res) => {
  res.json(properties);
});

app.get('/properties/:id', (req, res) => {
  const property = properties.find(p => p.id == req.params.id);
  res.json(property);
});

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Swabhagya Reality API is running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`✅ Auth routes: /auth/signup, /auth/login`);
  console.log(`📊 CORS enabled for all origins`);
});