const Flash = require("../utils/Flash");

exports.deshBoardGetController = async (req, res, next) => {
  res.render("pages/deshBoard/deshBoard", {
    title: "My Deshboard",
    flashMessage: Flash.getMessage(req),
  });
};
