const BillModel = require("../models/bill.model");
const AuthController = require("./auth.controller");

class BillController {
  /**
   *
   * @param {*} userId
   * 
   * @param {*} firstName
   * 
   * @param {*} lastName
   * 
   * @param {*} meterNumber
   * 
   * @param {*} currentReading
   * 
   * @param {*} previousReading
   * 
   * @param {*} consumption
   * 
   * @param {*} cost
   * 
   * @param {*} email
   * 
   */
  async record(userId, firstName, lastName, meterNumber, currentReading, previousReading,
    consumption, cost, email) {
    try {
      // check if user exists
      const userExists = await new AuthController().getId(email);
      if (!userExists) {
        return Error("User id does not exist");
      }


     await BillModel.create({
       userId:userExists,
       firstName, lastName, meterNumber, currentReading, previousReading,
       consumption, cost, email
      });
      return {
       userId:userExists,
       firstName, lastName, meterNumber, currentReading, previousReading,
       consumption, cost, email
      };
    } catch (error) {
      return Error(error.message);
    }
  }


  async getBills(email) {
    try {
      // check if user exists
      const userExists = await new AuthController().getId(email);
      if (!userExists) {
        return 'user does not exist(from bill controller)';
      }

      const allBills = await BillModel.find({ userId:userExists });

      return allBills;
    } catch (error) {
      console.log(error)
      return error;
    }
  }




  async getAllBills() {
    try {
      
      const allBills = await BillModel.find();
      
      return allBills;
    } catch (error) {
      return 0;
    }
  }



  async getId(email) {
    try {
      //Check if user exists
      const bill = await BillModel.findOne({email});
      if (!bill) {
        throw Error("Bill does not exists");
      }
      return bill._id
    } catch (error) {
      throw Error(error.message);
    }
  }



  async getFirstName(email) {
    try {
      //Check if post exists
      const bill = await BillModel.findOne({email});
      if (!bill) {
        throw Error("Bill does not exists");
      }
      return bill.firstName
    } catch (error) {
      throw Error(error.message);
    }
  }


  async getLastName(email) {
    try {
      //Check if post exists
      const bill = await BillModel.findOne({email});
      if (!bill) {
        throw Error("Bill does not exists");
      }
      return bill.lastName
    } catch (error) {
      throw Error(error.message);
    }
  }


  async getMeterNumber(email) {
    try {
      //Check if post exists
      const bill = await BillModel.findOne({email});
      if (!bill) {
        throw Error("Bill does not exists");
      }
      return bill.meterNumber
    } catch (error) {
      throw Error(error.message);
    }
  }



  
}
module.exports = BillController;
