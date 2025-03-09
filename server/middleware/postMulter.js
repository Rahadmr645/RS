import multer from "multer";
import path from 'path'



const Storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, './postImage');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + path.extname(file.originalname));
    }
})


const imageUpload = multer({
    storage: Storage,
});

export default imageUpload;