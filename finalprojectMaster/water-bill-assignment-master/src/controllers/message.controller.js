const MessageModel = require("../models/message.model");
const AuthController = require("../controllers/auth.controller");

class MessageController {
  /**
   *
   * @param {*} userId
   * 
   * @param {*} name
   * 
   * @param {*} body
   * 
   * @param {*} customEmail
   * 
   * @param {*} email
   * 
   */
  async record(email, customEmail, name, body) {
    try {
      // check if user exists
      const userExists = await new AuthController().getId(email);
      if (!userExists) {
        return Error("User id does not exist");
      }

    const userName = await new AuthController().getDetails(userExists);

     await MessageModel.create({
       userId:userExists,
       email,
       customEmail,
       name,
       body
      });
      return {
       userId:userExists,
       email,
       customEmail,
       name,
       body
      };
    } catch (error) {
      return Error(error.message);
    }
  }




  async recordLoggedOut(customEmail, name, body) {
    try {

     await MessageModel.create({
       customEmail,
       name,
       body
      });
      return {
       customEmail,
       name,
       body
      };
    } catch (error) {
      return Error(error.message);
    }
  }





  async getAllMessages() {
    try {
      
      const allMessages = await MessageModel.find();
      
      return allMessages;
    } catch (error) {
      return 0;
    }
  }
}
module.exports = MessageController;
