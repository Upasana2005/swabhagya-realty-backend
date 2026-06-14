const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/swabhagya_realty')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB not connected:', err.message));

// Routes
app.use('/api/properties', require('./routes/properties'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/enquiries', require('./routes/enquiry'));  // ← ADD THIS


// Default route
app.get('/', (req, res) => {
  res.send('Swabhagya Realty API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});