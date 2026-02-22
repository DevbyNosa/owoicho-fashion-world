import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;


const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const query = (text, params) => pool.query(text, params);
export default pool;
