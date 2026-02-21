import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD || "",
  port: process.env.PG_PORT, 
});

export const query = (text, params) => pool.query(text, params);
export default pool;