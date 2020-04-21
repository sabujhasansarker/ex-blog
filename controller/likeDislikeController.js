const Post = require("../models/Post");

exports.likesGetController = async (req, res, next) => {
  let { postId } = req.params;

  if (!req.user) {
    return res.status(403).json({
      error: "Your are not an anthenticated user",
    });
  }
  try {
    let userId = req.user._id;
    let liked = null;
    let post = await Post.findById(postId);

    if (post.dislikes.includes(userId)) {
      await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { dislikes: userId } }
      );
    }

    if (post.likes.includes(userId)) {
      await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { likes: userId } }
      );
      liked = false;
    } else {
      await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { likes: userId } }
      );
      liked = true;
    }
    let updatePost = await Post.findById(postId);
    res.status(200).json({
      liked,
      totalLikes: updatePost.likes.length,
      totalDislikes: updatePost.dislikes.length,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: "Server Error Occurred",
    });
  }
};

exports.getDislikeController = async (req, res, next) => {
  let { postId } = req.params;
  let userId = req.user._id;
  let disliked = null;

  if (!req.user) {
    return res.status(403).json({
      error: "Your are not an anthenticated user",
    });
  }
  try {
    let post = await Post.findById(postId);
    if (post.likes.includes(userId)) {
      await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { likes: userId } }
      );
    }

    if (post.dislikes.includes(userId)) {
      await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { dislikes: userId } }
      );
      disliked = false;
    } else {
      await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { dislikes: userId } }
      );
      disliked = true;
    }
    let updatePost = await Post.findById(postId);
    res.status(200).json({
      disliked,
      totalLikes: updatePost.likes.length,
      totalDislikes: updatePost.dislikes.length,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: "Server Error Occurred",
    });
  }
};
