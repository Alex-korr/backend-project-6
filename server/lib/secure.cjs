const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

module.exports = {
  hashPassword: async (password) => {
    console.log('=== hashPassword called ===');
    console.log('Password length:', password?.length);
    
    if (!password) {
      console.error('ERROR: No password provided to hashPassword');
      return '';
    }
    
    try {
      const hash = await bcrypt.hash(password, SALT_ROUNDS);
      console.log('Hash generated successfully');
      console.log('Hash length:', hash.length);
      console.log('Hash preview:', hash.substring(0, 30) + '...');
      return hash;
    } catch (error) {
      console.error('ERROR in hashPassword:', error);
      throw error;
    }
  },
  
  comparePassword: async (password, hash) => {
    console.log('=== comparePassword called ===');
    console.log('Password length:', password?.length);
    console.log('Hash length:', hash?.length);
    console.log('Hash preview:', hash?.substring(0, 30) + '...');
    
    if (!password || !hash) {
      console.error('ERROR: Missing password or hash');
      console.log('Password provided:', !!password);
      console.log('Hash provided:', !!hash);
      return false;
    }
    
    if (hash === '') {
      console.error('ERROR: Empty hash provided');
      return false;
    }
    
    try {
      const result = await bcrypt.compare(password, hash);
      console.log('bcrypt.compare result:', result);
      return result;
    } catch (error) {
      console.error('ERROR in bcrypt.compare:', error);
      console.error('Error stack:', error.stack);
      return false;
    }
  }
};