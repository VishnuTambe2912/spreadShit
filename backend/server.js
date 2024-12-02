const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/loginRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api/auth', loginRoutes);

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/financial-planner", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.error('Stack trace:', err.stack);
  });

  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
// Import and use routes
const incomeRoutes = require('./routes/incomeRoutes');
const expensesRoutes = require('./routes/expensesRoutes');
const investmentRoutes = require('./routes/investmentsRoutes');

app.use('/api/income', incomeRoutes);
app.use('/api/expenses', expensesRoutes);
app.use('/api/investments', investmentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.use(cors({
  origin: 'http://your-frontend-domain.com',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));
