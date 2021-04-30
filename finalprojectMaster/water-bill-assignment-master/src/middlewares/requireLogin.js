module.exports = (req, res, next) => {
  if (!req.cookies.userEmail) {
    return res.redirect(`/login`);
  }

  next();
};
