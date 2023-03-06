// const express = require('express')
// const app = express()

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/socdb',{
    useNewUrlparser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('success')
}).catch((e)=>{
    console.log('fail')
})
