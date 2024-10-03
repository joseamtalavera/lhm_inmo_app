const pool = require('./db');

const getUserByEmail = async (email) => {
  console.log('getUserByEmail:', email);

    try {
      const existingUser = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
      return existingUser.rows[0];
    } catch (error) {
      console.error('Error in getUserByEmail:', error);
      throw error;
    }
  };
  module.exports = { getUserByEmail };