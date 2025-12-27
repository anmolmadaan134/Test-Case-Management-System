import pkg from "pg";
const { Pool } = pkg;
import dotenv from 'dotenv'
dotenv.config()

console.log("DATABASE_URL USED BY BACKEND:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});



export const db = {
  query: (text, params) => pool.query(text, params)
};
