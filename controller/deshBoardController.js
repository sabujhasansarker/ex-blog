const { validationResult } = require("express-validator");

const Flash = require("../utils/Flash");
const Profile = require("../models/Profile");
const User = require("../models/User");

const errorFormatter = require("../utils/validationErrorFormatter");

exports.deshBoardGetController = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });

    if (profile) {
      return res.render("pages/deshBoard/deshBoard", {
        title: "My Deshboard",
        flashMessage: Flash.getMessage(req),
      });
    }
    res.redirect("/deshboard/create-profile");
  } catch (error) {
    next(error);
  }
};


exports.createProfileGetController = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    if (profile) {
      return res.redirect("/deshboard/edit-profile");
    }
    res.render("pages/deshBoard/create-profile", {
      title: "Create Your Profile",
      error: {},
      flashMessage: Flash.getMessage(req),
    });
  } catch (error) {
    next(error);
  }
};

exports.createProfilePostController = async (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.render("pages/deshBoard/create-profile", {
      title: "Create Your Profile",
      error: errors.mapped(),
      flashMessage: Flash.getMessage(req),
    });
  }
  try {
    const { name, title, bio, website, facebook, twitter, github } = req.body;

    const profile = new Profile({
      user: req.user._id,
      name,
      title,
      bio,
      profilePics: req.user.profilePics,
      links: {
        website: website || "",
        facebook: facebook || "",
        twitter: twitter || "",
        github: github || "",
      },
      posts: [],
      bookmarks: [],
    });
    const createProfile = await profile.save();
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { profile: createProfile._id } }
    );
    req.flash("success", "Profile created successfully");
    res.redirect("/deshboard");
  } catch (e) {
    next(e);
  }
};

exports.editProfileGetController = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
      return res.redirect("/deshboard/edit-profile");
    }

    res.render("pages/deshBoard/edit-profile", {
      title: "Edit Your Profile",
      error: {},
      flashMessage: Flash.getMessage(req),
      profile,
    });
  } catch (error) {
    next(error);
  }
};

exports.editProfilePostController = async (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  let { name, title, bio, website, facebook, twitter, github } = req.body;

  if (!errors.isEmpty()) {
    return res.render("pages/deshBoard/edit-profile", {
      title: "Edit Your Profile",
      error: errors.mapped(),
      flashMessage: Flash.getMessage(req),
      profile: {
        name,
        title,
        bio,
        links: { website, facebook, twitter, github },
      },
    });
  }
  try {
    let profile = {
      name,
      title,
      bio,
      links: {
        website: website || "",
        facebook: facebook || "",
        twitter: twitter || "",
        github: github || "",
      },
    };

    let updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $set: profile },
      { new: true }
    );

    req.flash("success", "Profile Updated Successfully");
    return res.render("pages/deshBoard/edit-profile", {
      title: "Edit Your Profile",
      error: errors.mapped(),
      flashMessage: Flash.getMessage(req),
      profile: updatedProfile,
    });
  } catch (e) {
    next(e);
  }
};
