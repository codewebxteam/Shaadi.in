const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); 

// Route imports
const authRoutes = require('./routes/authRoutes');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes); // 🔥 Yahan routes add kiye hain

// Basic Route
app.get('/', (req, res) => {
  res.send('LocalShaadi Backend is Running Smoothly! 💖');
});

// Port configuration
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});