const { Sequelize } = require("sequelize")

module.exports=(sequelize, Sequelize) =>{ //แพทเทิล
    const Role = sequelize.define("roles", {   //เหมือนการ สร้าง table ในฐานข้อมูล  เหมือนกับคำสั่ง create table 
        id:{
            type: Sequelize.INTEGER,
            primaryKey:true
        },
        name:{
            type: Sequelize.STRING
        }
    })
    return Role;
}