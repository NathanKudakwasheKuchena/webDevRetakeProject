const bcrypt = require("bcrypt");

class HashService {
    /**
     * 
     * @param {*} value 
     */
   async hash(value) {
    try {
      const saltRounds = 10;
      const res = await bcrypt.hash(value, saltRounds);
      return res;
    } catch (error) {
      throw Error(error.message) 
    }
  }

  /**
   * 
   * @param {*} value 
   * @param {*} hash 
   */
   async checkHash(value, hash) {
    try {
      return await bcrypt.compare(value, hash);
    } catch (_) {
      return false
    }
  }
}

module.exports = HashService