const Flash = require("../utils/Flash");
const Post = require("../models/Post");

exports.exploreGetController = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.render("pages/explorer/explorer", {
      title: "Explore All Posts",
      filter: "latest",
      flashMessage: Flash.getMessage(req),
      posts,
    });
  } catch (e) {
    next(e);
  }
};
