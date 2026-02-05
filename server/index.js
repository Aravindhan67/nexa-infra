const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./database/db');
require('dotenv').config();

const app = express();
connectDB();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const designRoutes = require('./routes/designs');
const projectRoutes = require('./routes/projects');
const authRoutes = require('./routes/auth');

app.use('/api/designs', designRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Virtual 360 Infrastructure API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
