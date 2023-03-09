const Cookies = require('cookies');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const token = req.cookies.access_token
    // const authHeader = req.headers.authorization || req.headers.Authorization;
    // if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    // const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err){
                return res.json({
                    message:"you must log in or unauthorize"
                })
            } 
             //invalid token
            req.user = decoded.userinfo.username;
            req.role = decoded.userinfo.role;
            next();
        }
        );
}

module.exports = verifyJWT 