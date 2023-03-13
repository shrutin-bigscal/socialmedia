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
const path = require('path')
const fs = require('fs')
router.use(bodyParser.urlencoded({ extended: true }))
router.use(express.urlencoded({ extended: true }))


//
router.get('/comment/:id',async(req,res)=>{
    const id = req.params.id
    const foundpost = await post.findOne({_id:id})
    // console.log(foundpost)
    res.render('viewco.ejs',{post:foundpost})
})



//add post 
router.get('/add', verifyJWT, async (req, res) => {
    res.render('postadd.ejs');
})

router.post('/add', verifyJWT, file.single('photo'), async (req, res) => {

    try {
        const userid = await user.findOne({ username: req.user })
        const { id } = userid
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

//show
router.use(express.static(path.join(__dirname, "../file")));
const directoryPath = path.join(__dirname, "../file/");
router.get('/show/:id', verifyJWT, async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        const data = await post.findOne({ _id: id })
        const filename = data.photo;
        console.log(filename)
        if (filename === null) {
            console.log('file not exiest or deleted ')
        }
        else {
            const showpath = path.join(directoryPath, filename);
            console.log(showpath)
            const data = fs.createReadStream(showpath)
            data.pipe(res);
        }
    }
    catch (err) {
        console.log(err)
    }
})

//mypost
router.get('/mypost', verifyJWT, async (req, res) => {
    try {
        const userid = await user.findOne({ username: req.user })
        const { id } = userid
        const mypost = await post.find({ 'user': id })
        res.render('mypost.ejs', { post: mypost })
    }
    catch (err) {
        console.log(err)
    }
})



//edit my post
router.get('/edit/:id', verifyJWT, async (req, res) => {

    const foundpost = await post.findOne({ _id: req.params.id })
    const file = path.join(directoryPath, foundpost.photo)
    // console.log(foundpost)
    res.render('editpost', { post: foundpost, photo: file, id: req.params.id })

})
router.post('/edit/:id', verifyJWT, file.single('photo'), async (req, res) => {

    try {
        const foundpost = await post.findOne({ _id: req.params.id })
        const file = foundpost.photo
        if (!req.file) {
            console.log('hear')
            const newvalue = { $set: { titile: req.body.title, desc: req.body.desc, photo: file } }
            await post.updateOne({ _id: req.params.id }, newvalue)
            res.redirect('/posts')
        }
        else {
            console.log('there')
            const newvalue = { $set: { titile: req.body.title, desc: req.body.desc, photo: req.file.filename } }
            await post.updateOne({ _id: req.params.id }, newvalue)
            res.redirect('/posts')
        }
    }
    catch (err) {
        console.log(err)
    }
})


//delete
router.get('/delete/:id', async (req, res) => {
    const id = req.params.id
    const data = await post.findOne({ _id: id })
    console.log(data);
    const filename = data.photo;
    console.log(filename)
    if (filename === null) {
        console.log('file not exiest or deleted ')
    }
    else {
        const deletepath = path.join(directoryPath, filename);
        fs.unlink(deletepath, async (err) => {
            if (err) {
                throw err;
            }
            console.log("Delete File successfully.");
            await post.deleteOne({ _id: req.params.id })
            res.redirect('/posts/mypost')
        });
    }
})

module.exports = router;