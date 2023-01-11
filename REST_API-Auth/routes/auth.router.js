const {verifySignUp} = require("../middleware")
const controller = require("../controller/auth.controller")

module.exports = function(app){
    app.use(function(req,res,next){  //เพราะเป็น module were
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    //signup
    //http://localhost:5000/apis/auth/signup
    app.post("/apis/auth/signup",[verifySignUp.checkDuplicateUserOrEmail, verifySignUp.checkRolesExisted]
    ,controller.signup
    );  //เรียกใช้ได้เลย เพราะเป็น arrow อยู่แล้วใน controller

    //Sign In
    //http://localhost:5000/apis/auth/signin
    app.post("/apis/auth/signin", // Path
    controller.signin  //function
    );
};