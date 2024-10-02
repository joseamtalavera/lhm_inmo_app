// db.js
require('dotenv').config();

const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = process.env.DATABASE_URL;

const poolConfig = {
    connectionString: connectionString,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
};


/* let poolConfig;

if (isProduction) {
    poolConfig = {
        host: process.env.AWS_HOST,
        port: process.env.AWS_PORT,
        database: process.env.AWS_DATABASE,
        user: process.env.AWS_USER,
        password: process.env.AWS_PASSWORD,
        ssl: {
            rejectUnauthorized: false
        },
    };
} else {
    poolConfig = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        
       
    };
    
} */

const pool = new Pool(poolConfig);

// Verify database connection
/* pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Database connection successful:', res.rows);
    }
    pool.end();
  }); */

module.exports = pool;