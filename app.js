require('./db/conn')
const role = require('./helper/role')
const auth = require('./helper/auth')
const express = require('express')
const app = express()
const user = require('./router/user')
app.set("view engine","ejs")
app.use(express.urlencoded({extended:false}))

// app.use("/api/auth", authRoute);
app.use("/users",user);
// app.use("/api/posts", postRoute);
app.listen(3030)