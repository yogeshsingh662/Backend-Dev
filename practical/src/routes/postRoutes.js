const express = require("express");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { postSchema, commentSchema } = require("../validators/postValidator");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { error } = postSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const exists = await Post.findOne({ title: req.body.title });

  if (exists) {
    return res.status(400).json({ message: "Duplicate title" });
  }

  const post = await Post.create({
    userId: req.user.id,
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags
  });

  res.json(post);
});

router.put("/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (post.userId.toString() !== req.user.id) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.json(updated);
});

router.delete("/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (
    post.userId.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  await post.deleteOne();

  res.json({ message: "Post deleted" });
});

router.post("/:id/comments", auth, async (req, res) => {
  const { error } = commentSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const comment = await Comment.create({
    postId: req.params.id,
    userId: req.user.id,
    comment: req.body.comment
  });

  res.json(comment);
});

router.get("/", async (req, res) => {
  const posts = await Post.find().lean();

  const data = await Promise.all(
    posts.map(async (post) => {
      const comments = await Comment.find({ postId: post._id })
      .populate("userId", "name");

      return {
        ...post,
        comments
      };
    })
  );

  res.json(data);
});

router.get("/trending/all", async (req, res) => {
  const trending = await Comment.aggregate([
    {
      $group: {
        _id: "$postId",
        totalComments: { $sum: 1 }
      }
    },
    {
      $sort: { totalComments: -1 }
    }
  ]);

  res.json(trending);
});

module.exports = router;