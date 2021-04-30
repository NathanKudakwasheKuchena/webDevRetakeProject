const AuthController = require("../controllers/auth.controller");



module.exports = async (req, res, next) => {
    
          // check if user exists
          const email = req.cookies.userEmail;
          const userId = await new AuthController().getId(req.cookies.userEmail);
          const userExists = await new AuthController().getDetails(userId);
          if (!userExists) {
            return 'user does not exist(from profile middleware)';
          }

          const firstName = userExists.firstName;
          const lastName = userExists.lastName;
          const meterNumber = userExists.meterNumber;
          req.profileArray = [email, firstName, lastName, meterNumber];

          next();
        } 
    
  