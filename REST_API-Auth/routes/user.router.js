const { authJwt } = require("../middleware");
const controller = require("../controller/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    //เพราะเป็น module were
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //http://localhost:5000/apis/test/all
  app.get("/apis/test/all", controller.allAccess);

  app.get("/apis/test/test", (req, res) => {
    res.send("test");
  });

  //http://localhost:5000/apis/test/user
  app.get("/apis/test/user", [authJwt.verifyToken], controller.userBoard);

  //http://localhost:5000/apis/test/admin
  app.get(
    "/apis/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  //http://localhost:5000/apis/test/mod
  app.get(
    "/apis/test/mod",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.moderatorBoard
  );
};
