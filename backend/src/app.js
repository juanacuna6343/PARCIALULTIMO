const express = require('express');
const cors = require('cors');
const path = require('path');
const env = require('./config/env');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const allowedOrigins = env.corsOrigin
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy does not allow access from origin ${origin}`));
      }
    },
    credentials: true,
  }),
);

app.use('/api/v1', routes);
app.use('/api/v1', (req, res) => res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Ruta no encontrada' } }));
app.use(errorHandler);

module.exports = app;
