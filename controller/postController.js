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
    tags = tags.map((t) => t.trim());
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
    res.redirect(`/posts/edit/${createPost._id}`);
  } catch (e) {
    next(e);
  }
};

exports.editPostGetController = async (req, res, next) => {
  let postId = req.params.postId;
  console.log(req.params);
  try {
    let post = await Post.findOne({ author: req.user._id, _id: postId });
    if (!post) {
      let error = new Error("404 Page Not Found");
      error.status = 404;
      throw error;
    }
    res.render("pages/deshBoard/post/editPost", {
      title: "edit a new post",
      error: {},
      flashMessage: Flash.getMessage(req),
      post,
    });
  } catch (e) {
    next(e);
  }
};

exports.editGetPostController = async (req, res, next) => {
  let { title, body, tags } = req.body;
  let postId = req.params.postId;
  const error = validationResult(req).formatWith(errorFormator);

  try {
    let post = await Post.findOne({ author: req.user._id, _id: postId });
    console.log(postId);
    if (!post) {
      let error = new Error("404 Page Not Found");
      error.status = 404;
      throw error;
    }
    if (!error.isEmpty()) {
      return res.render("pages/deshBoard/post/editPost", {
        title: "Edit a new post",
        error: error.mapped(),
        flashMessage: Flash.getMessage(req),
        post,
      });
    }
    if (tags) {
      tags = tags.split(",");
      tags = tags.map((t) => t.trim());
    }

    let thumbnail = post.thumbnail;
    if (req.file) {
      thumbnail = req.file.filename;
    }
    await Post.findOneAndUpdate(
      { _id: post._id },
      { $set: { title, body, tags, thumbnail } },
      { new: true }
    );
    req.flash("success", "Post Updated Successfully");
    res.redirect("/posts/edit/" + postId);
  } catch (e) {
    next(e);
  }
};

exports.getDeletePostGetController = async (req, res, next) => {
  let { postId } = req.params;
  try {
    let post = await Post.findOne({ author: req.user._id, _id: postId });
    if (!post) {
      let error = new Error("404 Page Not Found");
      error.status = 404;
      throw error;
    }
    await Post.findOneAndDelete({ _id: postId });
    await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { posts: postId } }
    );
    req.flash("success", "Post Delete Successfully");
    res.redirect("/posts");
  } catch (e) {
    next(e);
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ author: req.user._id });
    res.render("pages/deshBoard/post/posts", {
      title: "My all post",
      flashMessage: Flash.getMessage(req),
      posts,
    });
    res.render("pages/dashb");
  } catch (e) {
    next(e);
  }
};
