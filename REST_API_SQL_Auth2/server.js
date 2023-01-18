const express = require("express");
const cors = require("cors");
const restaurantRouter = require("./routes/restaurant.router");

// Create Server
const app = express();

//Sequlize Config
const db = require("./models")
const Role = db.role;

//reset auto
//db.sequelize.sync({force:true}).then(()=>{  //force ถ้าอันเดิมมีอยู่แล้วให้ลบทิ้งและเพิ่มใหม่
//  console.log("Drop and Resync database");
// initial();
//})


const initial = () =>{
  Role.create({
    id:1,
    name:"user"
  });
    Role.create({
    id:2,
    name:"moderator"
  });
    Role.create({
    id:3,
    name:"admin"
  });
}
//Use Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router
app.get("/", (req, res) => {
  res.send("<h1>This is Restaurant API</h1>");
});
// Restaurant router
app.use("/apis", restaurantRouter);
//Authen & User Router
app.use("/apis", restaurantRouter);

require("./routes/auth.routes")(app);
require("./routes/user.router")(app);
// Running server
app.listen(5000, () => {
  console.log("Server listening to port 5000");
});
