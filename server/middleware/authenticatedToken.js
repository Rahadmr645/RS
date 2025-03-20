import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/Users.js';
dotenv.config();


const authenticatedToken = async (req, res, next) => {
    const secreate = process.env.SECRET_KEY;
    const token = req.header('Authorization')?.split(' ')[1] // expacting token in "Bearer <token>" format

    if (!token) return res.status(403).json({ message: "Token missing" });



    try {

        const decoded = jwt.verify(token, secreate);

        const userId = decoded.id;

        const user = await User.findById(userId);

        req.user = user;
        req.userId = user._id;
        next(); // continue to the next middleware or route handle
    } catch (error) {
        res.status(401).json({ message: "invalid token" })
    }
}

export default authenticatedToken;