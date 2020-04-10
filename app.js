const app = require("express")();
const mongoose = require("mongoose");
require("dotenv/config");

const setRoutes = require("./routes/routes");
const middleware = require("./middleware/middleware");

middleware(app);

// * ejs setup
app.set("view engine", "ejs");
app.set("views", "views");

// * Router Setap
setRoutes(app);

app.use((req, res, next) => {
  let error = new Error("404 Page Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  if (error.status === 404) {
    return res.render("error/404", {
      title: "404 Not found",
      flashMessage: {},
    });
  }
  console.log(error);
  res.render("error/500", {
    title: "Internal Server Error",
    flashMessage: {},
  });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("DataBase Connected");
      console.log(`Server is running on Port ${PORT}`);
    });
  })
  .catch((e) => {
    return console.log(e);
  });
