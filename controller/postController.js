const { validationResult } = require("express-validator");
const readingTime = require("reading-time");

const Flash = require("../utils/Flash");
const errorFormator = require("../utils/validationErrorFormatter");
const Post = require("../models/Post");
const Profile = require("../models/Profile");

exports.createPostGetController = (req, res, next) => {
  res.render("pages/deshBoard/post/createPost", {
    title: "Create a new post",
    error: {},
    flashMessage: Flash.getMessage(req),
    value: {},
  });
};
exports.createPostPostController = async (req, res, next) => {
  let { title, body, tags } = req.body;
  const error = validationResult(req).formatWith(errorFormator);

  console.log(req.body);
  if (!error.isEmpty()) {
    return res.render("pages/deshBoard/post/createPost", {
      title: "Create a new post",
      error: error.mapped(),
      flashMessage: Flash.getMessage(req),
      value: { title, body, tags },
    });
  }
  if (tags) {
    tags = tags.split(",");
  }

  let readTime = readingTime(body).text;

  let post = new Post({
    title,
    body,
    tags,
    author: req.user._id,
    thumbnail: "",
    readTime,
    likes: [],
    dislikes: [],
    comments: [],
  });
  console.log(req.file);
  if (req.file) {
    post.thumbnail = `/uploads/${req.file.filename}`;
  }
  try {
    let createPost = await post.save();
    await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $push: { posts: createPost._id } }
    );
    req.flash("success", "Post Created Successfully");
    res.render("pages/deshBoard/post/createPost", {
      title: "Create a new post",
      error: {},
      flashMessage: Flash.getMessage(req),
      value: {},
    });
  } catch (e) {
    next(e);
  }
};
