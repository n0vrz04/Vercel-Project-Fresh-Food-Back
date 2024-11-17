const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false }
});

const testConnection = async () => {
    try {
        const res = await pool.query('SELECT NOW()'); 
        console.log('Connection successful:', res.rows[0]);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};


testConnection()
module.exports=pool