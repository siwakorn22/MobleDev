const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //http:localhsot:5000/apis/auth/signup
  app.post(
    "/apis/auth/signup",
    [verifySignUp.checkDuplicateUserOrEmail, verifySignUp.checkRolesExisted], //middleware ต้องใส่ในเครื่องหมาย []
    controller.signup //function
  );

  //Sign In
  //http:localhsot:5000/apis/auth/signin
  app.post(
    "/apis/auth/signin",
    controller.signin //function
  );
};
