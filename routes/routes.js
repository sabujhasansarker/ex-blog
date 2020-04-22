const authRoute = require("./authRoute");
const deshboard = require("./deshBoardRoute");
const uplode = require("./uploadeRoute");
const post = require("./postRoute");
const api = require("./apiRoutes");
const explorer = require("./exploreRoute");
const search = require("./searchRouter");

const playground = require("./playground");

const routes = [
  {
    path: "/auth",
    hendler: authRoute,
  },

  {
    path: "/deshboard",
    hendler: deshboard,
  },
  {
    path: "/uploads",
    hendler: uplode,
  },
  {
    path: "/posts",
    hendler: post,
  },
  {
    path: "/explorer",
    hendler: explorer,
  },
  {
    path: "/search",
    hendler: search,
  },
  {
    path: "/api",
    hendler: api,
  },
  {
    path: "/playground",
    hendler: playground,
  },
];

module.exports = (app) => {
  routes.forEach((r) => {
    if (r.path === "/") {
      app.get(r.path, r.hendler);
    } else {
      app.use(r.path, r.hendler);
    }
  });
};
