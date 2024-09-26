// db.js
require('dotenv').config();

const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

let poolConfig;

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
    
}

const pool = new Pool(poolConfig);
module.exports = pool;