const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads/avatars', express.static(path.join(__dirname, 'uploads/avatars')));

const authRoutes = require('./routes/auth');
const coursesRoutes = require('./routes/courses');
const profileRoutes = require('./routes/profile');

app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/profile', profileRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/membrosdb')
  .then(()=> app.listen(PORT, ()=> console.log('Backend rodando', PORT)))
  .catch(err=> console.error(err));
