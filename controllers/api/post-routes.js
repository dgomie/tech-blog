const router = require("express").Router();
const { User, Post } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.status(200).send(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.json(newPost);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
