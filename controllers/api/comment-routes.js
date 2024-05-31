const router = require('express').Router();
const { Comment } = require('../../models');


router.post("/", async (req, res) => {
    try {
      const newComment = await Comment.create(req.body);
      res.json(newComment);
    } catch (err) {
      res.json(err);
    }
  });
  
  router.delete("/", async (req, res) => {
    try{
      const deleteComment = await Comment.destroy({where: {id: req.body.id }});
      res.json(deleteComment);
    } catch (err) {
      res.json(err);
    }
  })


module.exports = router;
