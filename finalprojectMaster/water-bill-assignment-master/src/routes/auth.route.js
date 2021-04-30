const requireLogin = require("../middlewares/requireLogin");
const AuthController = require("../controllers/auth.controller");
const router = require("express").Router();



router.post("/register", async (req, res) => {
  try {
    const { body } = req;
    await new AuthController().register(
      body.firstName,
      body.lastName,
      body.meterNumber,
      body.email,
      body.password,
      body.confirm_password
    );
    // return res.status(200).json({ message: resp, code: 1 });
    res.redirect(`/login`);
  } catch (error) {
    // return res.status(400).json({ error: error.message, code: 0 });
    res.redirect(`/sign-up?message=${error.message}`);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { body } = req;
    await new AuthController().login(body.email, body.password);
    // return res.status(200).json({ message: resp, code: 1 });
    res.cookie("userEmail", body.email)
    res.redirect(`/dashboard`);
  } catch (error) {
    // return res.status(400).json({ error: error.message, code: 0 });
    res.redirect(`/login?message=${error.message}`);
  }
});

router.get("/logout", async (req, res) => {
  try {
    
    res.clearCookie("userEmail");
    res.redirect(`/`);
  } catch (error) {
    // return res.status(400).json({ error: error.message, code: 0 });
    res.redirect(`/login?message=${error.message}`);
  }
});

module.exports = router;
