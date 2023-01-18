const db = require("../models/index");
const config = require("../configs/auth.config");
const User = db.user; //เรียกมาจาก models/index.js
const Role = db.role; //เรียกมาจาก models/index.js
const Op = db.Sequelize.Op; //op เป็ย object ที่อยู่ใน Sequelize  พวก and or
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); //เข้ารหัส แปลงให้มองไม่เห็นรหัสที่จริง

exports.signup = (req, res) => {
  //Insert data
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8), //เข้ารหัส แปลงให้มองไม่เห็นรหัสที่จริง
  })
    .then((user) => {
      //then รอให้ทำข้างบนเสร็จและจะให้ทำอะไรต่อ
      if (req.body.roles) {
        //Select * from roles where name = req.body.roles
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            //Set คือกำหรดค่าให้กับ...
            res.send({ message: "User was registered successully" });
          });
        });
      }
      //ไม่ได้กำหนด roles
      else {
        //user role = 1
        user.setRoles([1]).then(() => {
          //ปรับตาม database ว่าเรากำหนดเป็นอะไร
          //Set คือกำหรดค่าให้กับ...
          res.send({ message: "User was registered successully" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  //select * from user where username = req.body.username
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not Found" });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      ); //เปรียบเทียบรหัส รหัส ที่กรอกเข้ามากับในฐานข้อมูล
      if (!passwordIsValid) {
        return res
          .status(401)
          .send({ accessToken: null, message: "Invalid Password!" });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, //24 ชม 24*60*60
      });

      let authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase()); //toUpperCase ตั้งให้เป็นตัวพิมพ์ใหญ่  นำ Roles ยัดเข้าไปใน authorities
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities, // นำ Roles ยัดเข้าไปใน authorities
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
