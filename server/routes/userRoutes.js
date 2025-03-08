import express from 'express'
import User from '../models/Users.js';
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config();

import jwt from 'jsonwebtoken';
import upload from '../middleware/multer.js';
const router = express.Router();


const SECRET_KEY = process.env.SECRET_KEY;
// 01 create routes
router.post('/create', upload.single('image'), async (req, res) => {

    try {
        const { name, email, password } = req.body;


        if (!name || !email || !password) return res.status(401).json({ message: "please fill all the input" });

        if (!req.file) return res.status(401).json({ message: "please uplaod a file" });

        const isExist = await User.findOne({ email });

        if (isExist) return res.status(404).json({ message: "User is already exist" });

        // make hasspassword

        const salt = await bcrypt.genSalt(10);

        const hashPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashPass,
            image: req.file.filename,
        });

        // jsonwebtoken 
        const token = jwt.sign({ id: newUser._id, name: newUser.name }, SECRET_KEY, { expiresIn: "1d" })

        await newUser.save();
        res.status(200).json({ message: "User create successfully", newUser, token })
    } catch (error) {
        res.status(500).json({ message: "Enternal error", error: error.message })
    }

})



// 02 login routes
router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(401).json({ message: "please fill all the input" });

        const isExist = await User.findOne({ email });

        if (!isExist) return res.status(404).json({ message: "unauthurised credential" });

        const comparePass = await bcrypt.compare(isExist.password, password)

        const newUser = new User({
            email,
            password: comparePass,
        });
        // jsonwebtoken 
        const token = jwt.sign({ id: isExist._id, name: isExist.name }, SECRET_KEY, { expiresIn: "1d" })
        res.status(200).json({ message: "login successfully", token })
    } catch (error) {
        res.status(500).json({ message: "Enternal error", error: error.message })
    }

})


export default router;