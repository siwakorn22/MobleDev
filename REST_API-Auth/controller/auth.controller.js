const db = require("../models/index");
const config = require("../configs/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op; //operlater ทุกตัวอยู่ใน op
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {user} = require("../models/index");

exports.signup = (req, res) => {
  //req user ส่งหา server res เซิฟเวอร์ส่งหา
  //Create User to database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8), //bcrypt เข้ารหัสถอดรหัส
  })
    .then((user) => {
      //then รอรับและทำอะไรต่อ
      if (req.body.roles) {
        //Select * from roles where name = req.body.roles
        Role.findAll({
          //find all คือส่ง object เข้าไป ว่ามี roles มั้ย เป็น role ไหน
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ 
                message: 
                "User was registered successfully" ,});
          });
        });
      }
      //ไม่ได้กำหนด roles
      else {
        user.setRoles(1).then(() => {
          //set role ให้กับ user 1 คือ user 2 คือ mo 3 คือ admin
          res.send({ message: "User was registered successfully" });
        });
      }
    })
    .catch((err) => {
      //catch การจับ 500 คือฝั่ง server
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  //Select * from user where username = req.body.username
  User.findOne({
    where: {
      username: req.body.username, //user ที่ผู้ใช้กรอก
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not Found." });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      ); //password  ที่ผู้ใช้ส่ง ถูกรึไม่
      if (!passwordIsValid) {
        return res
          .status(401)
          .sent({ accessToken: null, message: "Invalid Password" });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, //24 hours 24*60*60
      });

      let authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.lenght; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase()); //Upper ตัวพิมใหญ่ ทำการ ทำให้เป็นพิมใหญ่ทั้งหมด
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
