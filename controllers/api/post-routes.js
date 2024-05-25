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

router.delete("/", async (req, res) => {
  try{
    const deletePost = await Post.destroy({where: {id: req.body.id }});
    res.json(deletePost);
  } catch (err) {
    res.json(err);
  }
})

router.put("/", async (req, res) => {
  try{
    const updatedPost = await Post.update(
      {
      title: req.body.title,
      description: req.body.description
      },
      {
        where: {
          id: req.body.id,
          user_id: req.body.user_id
        }
      }
  )
  res.json(updatedPost)
  } catch (err) {
    res.json(err)
  }
})

module.exports = router;
