const Profile = require("../models/Profile");

exports.bookmarkGetController = async (req, res, next) => {
  let { postId } = req.params;
  if (!req.user) {
    return res.status(403).json({
      error: "Your are not an anthenticated user",
    });
  }
  try {
    let userId = req.user._id;
    let bookmarks = null;
    const profile = await Profile.findOne({ user: userId });

    if (profile.bookmarks.include(userId)) {
      await Profile.findOneAndUpdate(
        { user: userId },
        { $pull: { "bookmarks": postId } }
      );
      bookmarks = false;
    } else {
      await Profile.findOneAndUpdate(
        { user: userId },
        { $push: { "bookmarks": postId } }
      );
      bookmarks = true;
    }

    res.status(200).json({
        bookmarks
    })
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: "Server Error Occurred",
    });
  }
};
