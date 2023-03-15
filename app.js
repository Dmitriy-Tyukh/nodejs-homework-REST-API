const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config({ path: './.env' });

const contactsRoutes = require('./routes/api/contactsRoutes');
const app = express();

const formatLogger = process.env.NODE_ENV === 'development' ? 'dev' : 'short';

app.use(morgan(formatLogger));
app.use(cors());
app.use(express.json());
app.use('/api/contacts', contactsRoutes);

app.all('*', (req, res) => {
  res.status(404).json({ message: 'Resource Not found' });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
