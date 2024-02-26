import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //jaha hamare project me store karna hai uska link
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
 export const upload = multer({ storage, })