require('./db/conn')
require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const users = require('./router/user')
const posts = require('./router/posts')
const path = require('path')
const post = require('./model/post')
const user = require('./model/user')
const Role = require('./model/role')
const verifyJWT = require('./middleware/verifyjwt')
const verifyRoles = require('./middleware/verifyroles')
const bodyParser = require('body-parser');
const comment = require('./model/comment')
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/users", users);
app.use("/posts", posts);
// app.use("/comment", comment);

//index page
app.use(express.static(path.join(__dirname, "file")));
// const directoryPath = path.join(__dirname, "/file");
app.get('/posts', async (req, res) => {
    try {
        const allpost = await post.find({}).populate('user')
        res.render('index.ejs', { post: allpost })
    }
    catch (err) {
        console.log(err)
    }
})

//open post with comment
app.get('/:id', verifyJWT, async (req, res) => {
    try {
        console.log('hello')
        const id = req.params.id
        const foundpost = await post.findOne({ _id: id}).populate('user').populate({path:'postComment'}).populate('postComment.user')
        console.log(foundpost)
        res.render('viewco', { post: foundpost })
    }
    catch (err) {
        console.log(err)
    }
})

//add comment
app.post('/comment/:id', verifyJWT, async (req, res) => {
    const userid = await user.findOne({ username: req.user })
    const { id } = userid
    try {
        newvalue = { user: id, comment: req.body.comment }
        await post.updateOne({ _id: req.params.id }, { $push: { 'postComment': newvalue } })
        res.redirect('/' + req.params.id)
    }
    catch (err) {
        console.log(err)
    }
})


//comment user delete 
app.get('/comment/remove/:id', verifyJWT, async (req, res) => {
    try {
        console.log('commentid>>>>', req.params.id)
        const getuser = await user.findOne({ username: req.user }).populate('role')
        const r = getuser.role
        const cheackrole = await Role.findOne({ _id: r })
        const { role } = cheackrole
        console.log(role)
        if (role == 'admin') {
            console.log('admin access')
            const cid = (req.params.id)
            // console.log(cid)
            const postid = await post.findOne({ 'postComment._id': cid })   
            const { id } = postid
            console.log("postid>>>>>",id)
            newvalue = { isDeleted : true }
            const update = await post.updateOne({ _id: id },{ $match : {'postComment._id' : req.params.id , $set : { 'postComment': newvalue }}})
            console.log("update data>>>>>",update)
            // {$in:{ 'postComment._id' $set: { 'postComment': newvalue }}}).where('postCommnet').equals(rid)    
            res.redirect('/' + id)
        }
        else if (role == 'user') {
            console.log('user access')
        }
        else {
            console.log('you are unuthorize')
        }
    }

    catch (err) {
        console.error(err)
    }
})


app.listen(process.env.PORT || 3030)