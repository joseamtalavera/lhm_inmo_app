const bcrypt = require('bcrypt');

const password = 'lha1234'; // Replace with your desired password

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hashed Password:', hashedPassword);
  } catch (err) {
    console.error('Error hashing password:', err);
  }
};

hashPassword(password);