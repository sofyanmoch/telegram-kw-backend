const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
      cb(null, 'src/img')
    },
    filename: (req, file, cb)=> {
      cb(null, `${file.fieldname}-${Date.now()}.png`)
    }
  })
   
const upload = multer({ 
  storage,
  limits: {fileSize: 10000}, // byte
  fileFilter(req,file,cb){
    if(file.originalname.match(/\.(jpg|jpeg|png)\b/)){
      cb(null,true)
    }else{
      cb('Format image salah',null)
    }
  }
})

module.exports = upload