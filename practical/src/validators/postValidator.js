const Joi = require("joi");

exports.postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  tags: Joi.array().items(Joi.string())
});

exports.commentSchema = Joi.object({
  comment: Joi.string().required()
});