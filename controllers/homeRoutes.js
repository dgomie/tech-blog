const withAuth = require('../utils/auth')

const router = require('express').Router();
const { User, Post } = require('../models');


router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );
  res.render('homepage', {
    title: 'Tech Blog',
    logoTitle: "The Tech Blog",
    loggedIn: req.session.loggedIn,
    posts
  });
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}

});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login", {
    title: "Login",
    logoTitle: "The Tech Blog"
  });
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup", {
    title: "Sign Up",
    logoTitle: "The Tech Blog"
  });
});

router.get("/dashboard", (req, res) => {
  res.render('dashboard', {
    title: 'Dashboard',
    logoTitle: "Your Dashboard",
    loggedIn: req.session.loggedIn
  })
})

router.get("/logout", (req, res) => {
    res.render("logout", {
      title: "Log out",
      logoTitle: "The Tech Blog",
      loggedIn: req.session.loggedIn
    });
})


module.exports = router;
