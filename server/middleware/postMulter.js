
import multer from "multer";
import path from 'path'


const storage = multer.diskStorage({

    destination: './postImage',
    filename: (req,file,cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }

})



const imageUpload = multer({ storage})

export default imageUpload;