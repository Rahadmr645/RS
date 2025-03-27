import multer from "multer";
import path from 'path'
const storage = multer.diskStorage({
    destination: './postVideo',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + path.extname(file.originalname));
    }
});

const uploadVideo = multer({ storage });

export default uploadVideo;