const { Sequelize } = require("sequelize")

module.exports=(sequelize, Sequelize) =>{ //แพทเทิล
    const User = sequelize.define("users", {   //เหมือนการ สร้าง table ในฐานข้อมูล  เหมือนกับคำสั่ง create table  ตรง users คือการตั้งชื่อตาราง
        username:{
            type: Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING
        },
        password:{
            type:Sequelize.STRING
        }
    })
    return User;
}