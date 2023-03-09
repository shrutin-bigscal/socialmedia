const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/socdb', {
    useNewUrlparser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('success')
}).catch((e) => {
    console.log('fail')
})
