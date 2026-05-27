const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// 🔥 SABSE PEHLE: Environment variables load karo! 
// Taaki baaki files (jaise ImageKit config) ko keys mil sakein.
dotenv.config();

const connectDB = require('./config/db'); 

// Route imports (Ab isko import hote time .env ki keys properly mil jayengi)
const authRoutes = require('./routes/authRoutes');

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(cors());

// Payload limit badha di (Halanki ab Multer use ho raha hai, but JSON texts ke liye thik hai)
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

// API Routes
app.use('/api/auth', authRoutes); 

// Basic Route
app.get('/', (req, res) => {
  res.send('LocalShaadi Backend is Running Smoothly! 💖');
});

// Port configuration
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});