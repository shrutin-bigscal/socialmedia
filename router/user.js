require('dotenv').config()

const express = require('express')
const router = express.Router()
const user = require('../model/user');
const post = require('../model/post')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const role = require('../model/role')
const verifyRoles = require('../middleware/verifyroles')
const verifyJWT = require('../middleware/verifyjwt')
const { access } = require('fs');

router.get('/login', async (req, res) => {

    const r = await role.find()
    res.render('login.ejs', { role: r })
})



//login user
router.post('/login', async (req, res) => {

    const username = req.body.username
    const password = req.body.password
    const founduser = await user.findOne({ username: username })
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
    const access_token = jwt.sign({ 'userinfo': { 'username': founduser.username, 'password': founduser.password, 'role': founduser.role } }, process.env.ACCESS_TOKEN_SECRET)
    res.cookie("access_token", access_token, {
        httpOnly: true,
    })
    res.redirect('/posts')
})


//register user 
router.post('/register', async (req, res) => {
    try {
        var valid;
        let u = await user.find({ username: req.body.username });
        for (let a in u) {
            valid = (u[a].username == req.body.username)
            return valid
        }
        if (!valid) {
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
        }
        else {
            res.send('username taken')
        }
    } catch (err) {
        res.send("err" + err)
    }
})



//update user details
router.get('/edit', verifyJWT, async (req, res) => {

    const founduser = await user.findOne({ username: req.user })
    res.render('edituser', { user: founduser })

})
router.post('/edit', verifyJWT, async (req, res) => {

    const founduser = await user.findOne({ username: req.body.username })
    const userid = await user.findOne({ username: req.user })
    const { id } = userid
    console.log(id)
    if (founduser === null) {
        console.log(req.body)
        await user.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        res.redirect('/posts')
    }
    else {
        // alert('username taken')
        console.log('username taken')
        res.redirect('/posts')
    }
})


//logout user
router.get('/logout', function (req, res) {
    try {
        res.clearCookie('access_token');
        res.redirect('/users/login');
    }
    catch (err) {
        console.log(err)
    }
});


module.exports = router