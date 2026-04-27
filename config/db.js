import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;


const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    ca: null
  },
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export const query = (text, params) => pool.query(text, params);
export default pool;
