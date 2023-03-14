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
const verifyJWT = require('./middleware/verifyjwt')
const bodyParser = require('body-parser');
const comment = require('./model/comment')
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/users", users);
app.use("/posts", posts);
// app.use("/comment", comment);


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
app.get('/:id',verifyJWT,async (req,res)=>{
    try{
        const id = req.params.id
        const foundpost = await post.findOne({_id:id}).populate('postComment').populate('postComment.user')
        console.log(foundpost.postComment)
        res.render('viewco',{post:foundpost})
    }
    catch(err)
    {
        console.log(err)
    }
})

//add comment
app.post('/comment/:id',verifyJWT,async(req,res)=>{
    const userid = await user.findOne({username:req.user})
    const { id } = userid
    try{ 
        newvalue = {user:id,comment:req.body.comment}
        console.log(newvalue)
        await post.updateOne({_id:req.params.id},{$push:{ 'postComment' : newvalue }})
        res.redirect('/' + req.params.id)
    }
    catch(err)
    {
        console.log(err)
    }
})


app.listen(process.env.PORT || 3030)