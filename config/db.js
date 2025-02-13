import pg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pg;

// Load the environment variables
dotenv.config(); 

// Initialize the Database connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Connect to the Database
pool.connect()
    .then(() => console.log('Connected to the database!'))
    .catch((err) => console.error('Error connecting to the database!', err));

export default pool;
