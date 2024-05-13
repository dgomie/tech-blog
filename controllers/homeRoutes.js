const router = require('express').Router();

router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('homepage');
});

router.get("/login", (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect("/");
  //   return;
  // }

  res.render("login");
});

router.get("/dashboard", (req, res) => {
  res.render('dashboard')
})


module.exports = router;
