//เช็ค password
const jwt =require("jsonwebtoken");
const config = require("../configs/auth.config")
const db = require("../models")
const User = db.user;

verifyToken = (req, res, next) =>{
    let token = req.headers['x-access-token'];
    if(!token){
        return res.status(403).send({
            message:"No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded)=>{
        if(err){
            return res.status(401).send({
                message:"Unauthorized!"
            });
        }
        req.userId = decoded.indexOf;
        next();
    });
}

isAdmin = (req,res,next) =>{
    User.findByPK(req.userId).then(user=>{
        user.getRoles().then(roles=>{
            for(let i = 0; i< roles.length; i++){
                if(roles[i].name === "admin"){
                    next();
                    return;
                }
            }
            res.status(403).send({
                message:"Require Admin Role"
            });
            return;
        });
    });
};

isModerattor = (req,res,next) =>{
    User.findByPK(req.userId).then(user=>{
        user.getRoles().then(roles=>{
            for(let i = 0; i< roles.length; i++){
                if(roles[i].name === "Moderator"){
                    next();
                    return;
                }
            }
            res.status(403).send({
                message:"Require Moderator Role"
            });
            return;
        });
    });
};

isModeratorOrAdmin = (req,res,next) =>{
    User.findByPK(req.userId).then(user=>{
        user.getRoles().then(roles=>{
            for(let i = 0; i< roles.length; i++){
                if(roles[i].name === "moderator"){
                    next();
                    return;
                }
                 if(roles[i].name === "admin"){
                    next();
                    return;
                }
            }
            res.status(403).send({
                message:"Require Admin or Moderator Role"
            });
            return;
        });
    });
};

const authJwt = {
    verifyToken : verifyToken,
    isAdmin: isAdmin,
    isModerattor: isModerattor,
    isModeratorOrAdmin: isModeratorOrAdmin
}

module.exports = authJwt;