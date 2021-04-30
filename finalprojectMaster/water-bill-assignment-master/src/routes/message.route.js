const router = require("express").Router();
const { record } = require("../controllers/message.controller");
const MessageController = require("../controllers/message.controller");



router.post("/messages", async (req, res) => {

    try {
      const cookie = req.cookies;
      const {customEmail, name, body} = req.body;
      await new MessageController().record(cookie.userEmail, customEmail, name, body);
      return res.redirect('/thanks')
    } catch (err) {
      console.log(err);
      res.status(422).send(err);
    };
  });







  module.exports = router;