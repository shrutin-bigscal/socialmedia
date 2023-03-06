require('./db/conn')
const role = require('./helper/role')
const auth = require('./helper/auth')
const express = require('express')
const app = express()
app.set("view engine","ejs")
app.use(express.urlencoded({extended:false}))


app.get('/login',(req,res)=>{

    res.render("login.ejs")    

})
app.post('/login',(req,res)=>{

    
    console.log(req.body)
    // res.render("login.ejs")    

})

app.listen(3030)