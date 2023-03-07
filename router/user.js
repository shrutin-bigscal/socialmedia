require('dotenv').config()

const express = require('express')
const router = express.Router()
const user = require('../model/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
// const role = require('../helper/role')
const role = require('../model/role')
const verifyRoles = require('../middleware/verifyroles')
const verifyJWT = require('../middleware/verifyjwt')
const validateuser = require('../validation');

router.get('/login', async (req, res) => {

    const r = await role.find()
    res.render('login.ejs', { role: r })
})


router.post('/login', async (req, res) => {

    const username = req.body.username
    const password = req.body.password
    const founduser = await user.findOne({ username: username }).populate('role')
    if (!founduser) {
        return res.status(404).json({
            message: "Username is not found. Invalid login credentials.",
            success: false
        });
    }
    const matchpass = await bcrypt.compare(password, founduser.password)
    if (!matchpass) {
        return res.status(404).json({
            message: "false password",
            success: false
        });
    }
    const access_token = jwt.sign({ 'userinfo': { 'username': founduser.username, 'password': founduser.password, 'role': founduser.role.role } }, process.env.ACCESS_TOKEN_SECRET)
    res.json({ access_token: access_token })
})

router.get('/edit', verifyJWT, (req, res) => {
    console.log(req.username)
})


router.post('/register', async (req, res) => {

    var valid;
    let u = await user.find({ username: req.body.username });
    for (let a in u) {
        valid = (u[a].username == req.body.username)
        return valid
    }
    if (!valid) {
        try {
            const password = await bcrypt.hash(req.body.password, 10)
            const U = new user();
            U.fullname = req.body.fullname;
            U.username = req.body.username;
            U.email = req.body.email;
            U.role = req.body.role;
            U.password = password;
            console.log(U)
            await U.save();
            res.redirect('/users/login')
        } catch (err) {
            res.send("err" + err)
        }
    }
    else {
        res.send('username teken')
    }
})
module.exports = router