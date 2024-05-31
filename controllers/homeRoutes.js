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
      order: [['postDate', 'DESC']],
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
//withauth
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: {user_id: req.session.userId},
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      order: [['postDate', 'DESC']],
    });
    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );

    res.render('dashboard', {
      title: 'Dashboard',
      logoTitle: "Your Dashboard",
      loggedIn: req.session.loggedIn,
      ...req.session,
      posts
    })
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}  
})

//withauth
router.get("/post/", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("postpage", {
    
  });
});



router.get("/logout", (req, res) => {
    res.render("logout", {
      title: "Log out",
      logoTitle: "The Tech Blog",
      loggedIn: req.session.loggedIn
    });
})


module.exports = router;
