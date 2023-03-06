const express = require('express')
const router = express.Router()
const user = require('../model/user');
const bcrypt = require("bcrypt");
const validateuser = require('../validation')
router.get('/login', (req, res) => {

    console.log(req.body)
    res.render('login.ejs')
})


router.post('/login', async (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;
    const hashpassword = await bcrypt.hash(password,10)
    const checkuser = { name: username, password: hashpassword }
    console.log(user)
    const access_token = jwt.sign(checkuser, process.env.ACCESS_TOKEN_SECRET)
    res.json({ access_token: access_token })
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

})
module.exports = router