const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();

// * ejs setup
app.set("view engine", "ejs");
app.set("views", "views");

// * Middleware Setup
const middleware = [
  morgan("dev"),
  express.static("public"),
  express.urlencoded({ extended: true }),
  express.json(),
];
app.use(middleware);

// * Router Setap
const authRoute = require("./routes/authRoute");
app.use("/auth", authRoute);

app.get("/", (req, res) => {
  // res.render("pages/auth/singup.ejs", { title: "Create A New Account" });
  res.json({
    message: "Hello world",
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
