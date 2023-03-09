require('dotenv').config()

const express = require('express')
const router = express.Router()
const user = require('../model/user');
const post = require('../model/post')
const multer = require('multer')
const file = require('../middleware/fileupload')
const verifyJWT = require('../middleware/verifyjwt')
const validateuser = require('../validation');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:true}))
router.use(express.urlencoded({extended:true}))

//allposts




//add post 
router.get('/add',verifyJWT,async(req,res)=>{
    res.render('postadd.ejs');
})

router.post('/add',verifyJWT,file.single('photo'),async(req,res)=>{

    const userid = await user.findOne({username:req.user}) 
    const { id } = userid 
    console.log(id)
    try {
        console.log(req.body)
        const U = new post();
        U.title = req.body.title;
        U.desc = req.body.desc;
        U.user = id;
        U.photo = req.file.filename;
        console.log(U)
        await U.save();
        res.redirect('/posts')
    } catch (err) {
        res.send("err" + err)
    }
})


module.exports = router;