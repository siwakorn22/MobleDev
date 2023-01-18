const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //http:localhsot:5000/apis/test/all
  app.get("/apis/test/all", controller.allAccess);

  //http:localhsot:5000/apis/test/user
  app.get("/apis/test/user", [authJwt.verifyToken], controller.userBoard);

  //http:localhsot:5000/apis/test/admin
  app.get(
    "/apis/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  //http:localhsot:5000/apis/test/mod
  app.get(
    "/apis/test/mod",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.moderatorBoard
  );
};
