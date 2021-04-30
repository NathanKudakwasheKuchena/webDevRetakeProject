const router = require("express").Router();
const { record } = require("../controllers/bill.controller");
const BillController = require("../controllers/bill.controller");
const AuthController = require("../controllers/auth.controller");
const BillModel = require("../models/bill.model");
const ObjectId = require('mongodb').ObjectId;



router.post("/bills", async (req, res) => {

    try {
      const cookie = req.cookies;
      const {currentReading, previousReading} = req.body;

      const consumption = currentReading-previousReading;
      let cost;

      if(consumption <= 5)
      {
          cost = 340
      }
      else if(consumption > 5 && consumption <= 20)
      {
          cost = 720
      }
      else if(consumption > 20 && consumption <= 50)
      {
          cost = 845
      }
      else if(consumption > 50)
      {
          cost = 877
      }


      const userId = await new AuthController().getId(cookie.userEmail);
      const firstName = await new AuthController().getFirstName(cookie.userEmail);
      const lastName = await new AuthController().getLastName(cookie.userEmail);
      const meterNumber = await new AuthController().getMeterNumber(cookie.userEmail);
      await new BillController().record(userId, firstName, lastName, meterNumber, currentReading, previousReading,
        consumption, cost, cookie.userEmail);
      return res.redirect('/bills')
    } catch (err) {
      console.log(err);
      res.status(422).send(err);
    };
  });





  module.exports = router;