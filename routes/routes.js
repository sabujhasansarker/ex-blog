const authRoute = require("./authRoute");
const deshboard = require("./deshBoardRoute");

const routes = [
  {
    path: "/auth",
    hendler: authRoute,
  },
  {
    path: "/",
    hendler: deshboard,
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
