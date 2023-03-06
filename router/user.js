const express = require('express')
const router = express.Router()
const user = require('../model/user');
const bcrypt = require("bcrypt");


router.get('/login', (req, res) => {

    console.log(req.body)
    res.render('login.ejs')
})


router.post('/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const user = { name: username, password: password }
    console.log(user)
    // const access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    // res.json({ access_token: access_token })

})

module.exports = router