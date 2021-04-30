
const UserModel = require("../models/user.model");
const HashService = require("../services/hash.service");

class AuthController {
    /**
     * 
     * @param {*} userId 
     */
    async userIdExist(userId){
        try {
            const user = await UserModel.findById(userId);
            return user != null && user != undefined
        } catch (error) {
            return false
        }
    }

/**
 * 
 * @param {*} email 
 * @param {*} password 
 */
  async  login(email, password) {
    try {
      //Check if user exists
      const userExists = await UserModel.findOne({ email });
      if (!userExists) {
        throw Error("User does not exists");
      }
      const isCorrectPassword = await new HashService().checkHash(
        password,
        userExists.password
      );
      // if yes, verify passowrd
      if (isCorrectPassword) {
        return "Login successful";
      } else {
        throw Error("Incorrect password");
      }
    } catch (error) {
      throw Error(error.message);
    }
  }

  /**
   * 
   * @param {*} firstName 
   * @param {*} lastName 
   * @param {*} meterNumber 
   * @param {*} email 
   * @param {*} password 
   */
  async register(firstName, lastName, meterNumber, email, password, confirmPassword) {
    try { 
      // check if email already exists
      const userEmailExists = await UserModel.findOne({ email });
      const meterNumberExists = await UserModel.findOne({ meterNumber });
      if (userEmailExists) {
        throw Error("User email already exists");
      }
      if (meterNumberExists) {
        throw Error("meterNumber already exists");
      }

      if (password !== confirmPassword) {
        throw Error("Passwords do not match");
      }
      const hashedPassword = await new HashService().hash(password);
      await UserModel.create({ firstName, lastName, meterNumber, email, password: hashedPassword });
      return "Registration complete. Login";
    } catch (error) {
      throw Error(error.message);
    }
  }

  async  getDetails(userId) {
    try {
      //Check if user exists
      const user = await UserModel.findById(userId);
      if (!user) {
        throw Error("User does not exists");
      }
      return user
      
    } catch (error) {
      throw Error(error.message);
    }
  }
  async getId(email) {
    try {
      //Check if user exists
      const user = await UserModel.findOne({email});
      if (!user) {
        throw Error("User does not exists");
      }
      return user._id
    } catch (error) {
      throw Error(error.message);
    }
  }


  async getMeterNumber(email) {
    try {
      //Check if user exists
      const user = await UserModel.findOne({email});
      if (!user) {
        throw Error("User does not exists");
      }
      return user.meterNumber
    } catch (error) {
      throw Error(error.message);
    }
  }

  async getFirstName(email) {
    try {
      //Check if user exists
      const user = await UserModel.findOne({email});
      if (!user) {
        throw Error("User does not exists");
      }
      return user.firstName
    } catch (error) {
      throw Error(error.message);
    }
  }

  async getLastName(email) {
    try {
      //Check if user exists
      const user = await UserModel.findOne({email});
      if (!user) {
        throw Error("User does not exists");
      }
      return user.lastName
    } catch (error) {
      throw Error(error.message);
    }
  }

  

  
}


module.exports = AuthController