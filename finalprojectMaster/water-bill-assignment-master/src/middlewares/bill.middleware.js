const AuthController = require("../controllers/auth.controller");
const BillController = require("../controllers/bill.controller");

module.exports = async (req, res, next) => {


  const billsArray = await new BillController().getBills(req.cookies.userEmail);


  let totalBills = billsArray.length;


  req.totalBills = totalBills;
  req.billsArray = billsArray;


  next();
};
