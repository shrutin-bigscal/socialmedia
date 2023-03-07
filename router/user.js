require('dotenv').config()

const express = require('express')
const router = express.Router()
const user = require('../model/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const role = require('../helper/role')
const verifyRoles = require('../middleware/verifyroles')
const validateuser = require('../validation')
router.get('/login', (req, res) => {

    console.log(req.body)
    res.render('login.ejs')
})


router.post('/login',verifyRoles(role.user),async (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;
    const founduser = await user.findOne({username:username})
    console.log(founduser);
    const matchpass = await bcrypt.compare(password,founduser.password)
    if(!matchpass)
    {
        console.log('password worng')
    }
    const access_token = jwt.sign({'userinfo':{'username':founduser.username,'password':founduser.password ,'role':founduser.role}}, process.env.ACCESS_TOKEN_SECRET)
    res.json({ access_token: access_token })
    console.log(access_token);
})


router.post('/register', async (req,res)=>{

    // const validate = validateuser(req.body)
    const password = await bcrypt.hash(req.body.password,10)
    const U = new user();
    U.fullname = req.body.fullname;
    U.username = req.body.username;
    U.email = req.body.email;
    U.password = password;
    console.log(U)
    await U.save();

})
module.exports = router