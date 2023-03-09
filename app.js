require('./db/conn')
require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const user = require('./router/user')
const posts = require('./router/posts')
const post = require('./model/post')
app.set("view engine","ejs")
app.use(express.urlencoded({extended:false}))


app.use("/users",user);
app.use("/posts",posts);



app.get('/posts', (req, res) => {
    try{

        const allpost = post.find()
        res.render('index.ejs',{ post:allpost })
    }
    catch(err)
    {
        console.log(err)
    }
})

app.listen(process.env.PORT || 3030 )