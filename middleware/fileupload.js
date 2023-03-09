const multer = require('multer')
const path = require('path')
//file upload

const maxSize = 1024 * 1024 * 50;
function randomString() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let str = "";
    for (let i = 1; i <= 5; i++) {
        str += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return str;
}
const file = multer({
    storage: multer.diskStorage({
        destination: (req, file, cd) => {
            cd(null,'./file');
        },
        filename: (req, file, cd) => {
            // console.log(file)
            cd(null, Date.now() + randomString() + path.extname(file.originalname));
        },
    }),
    limits: { fileSize: maxSize },
})


module.exports = file