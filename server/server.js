const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const jobsRoutes = require('./routes/jobs');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace <db_uri> with your actual MongoDB URI)
mongoose.connect('mongodb://127.0.0.1:27017/alumsphere', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
