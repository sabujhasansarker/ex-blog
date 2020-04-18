const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      maxlength: 15,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    profilePics: {
      type: String,
      default: "/uploads/defult.jpg",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
