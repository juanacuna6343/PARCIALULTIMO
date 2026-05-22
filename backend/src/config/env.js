const path = require('path');
const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
const envPath = path.resolve(__dirname, '..', '..', '..', envFile);

dotenv.config({ path: envPath });

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5001),
  jwtSecret: process.env.JWT_SECRET || 'change-this-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '8h',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  db: {
    dialect: process.env.DB_DIALECT || 'sqlite',
    storage: process.env.DB_STORAGE || path.resolve(__dirname, '..', '..', 'data', 'sgdi.sqlite'),
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'sgdi_db',
    username: process.env.DB_USER || 'sgdi_user',
    password: process.env.DB_PASSWORD || 'SecurePassword123!'
  },
  supabase: {
    url: process.env.SUPABASE_URL || '',
    key: process.env.SUPABASE_KEY || '',
    bucket: process.env.SUPABASE_BUCKET || 'documents',
  }
};
