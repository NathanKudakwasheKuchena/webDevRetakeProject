
const UserModel = require("../models/user.model");
const BillModel = require("../models/bill.model");
const requireLogin = require("../middlewares/requireLogin");
const ObjectId = require('mongodb').ObjectId;
var moment = require('moment');
const profileMW = require("../middlewares/profile.middleware");
const billMW = require("../middlewares/bill.middleware");


module.exports = (app) => {



  app.get("/sign-up", (req, res) => {
    res.render("sign-up.hbs");
  });

  app.get("/login", (req, res) => {
    res.render("login.hbs");
  });



  app.get("/", async (req, res) => {
    res.render("index.hbs")
  });

  app.get("/submit", async (req, res) => {
    res.render("submit.hbs")
  });

  app.get("/dashboard", requireLogin, profileMW, async (req, res) => {
    res.render("dashboard.ejs", {
      profile: req.profileArray
    });
  });

  app.get("/bills", requireLogin, profileMW, billMW,  async (req, res) => {
    res.render("bills.ejs", {
      profile: req.profileArray,
      bills: req.billsArray,
      moment: moment
    });
  });



  app.get('/single-bill/:id', requireLogin, profileMW, billMW, async (req, res) => {
    await BillModel.findOne({ "_id": ObjectId(req.params.id)}, function (err, bill){
      if (err) return console.log(err)
      res.render('single-bill.ejs', {
        bill: bill,
        profile: req.profileArray,
        bills: req.billsArray,
        moment: moment
      })
    })
  })


  app.get("/contact", requireLogin, (req, res) => {
    res.render("create-message.hbs")
  });


  app.get("/thanks", requireLogin, (req, res) => {
    res.render("thanks.hbs")
  });





  //Unused routes:

  app.patch('/users/me', requireLogin, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})



app.delete('/users/me', requireLogin, async (req, res) => {
  try {
      await req.user.remove()
      res.send(req.user)
  } catch (e) {
      res.status(500).send()
  }
})



};
