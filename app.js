require('./db/conn')
require('dotenv').config()
const role = require('./helper/role')
const auth = require('./helper/auth')
const express = require('express')
const app = express()
const user = require('./router/user')
app.set("view engine","ejs")
app.use(express.urlencoded({extended:false}))
// app.use(express.json)
// app.use("/api/auth", authRoute);
app.use("/users",user);
// app.use("/api/posts", postRoute);
app.listen(process.env.PORT || 3030 )