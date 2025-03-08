import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();


const authenticatedToken = (req, res, next) => {
    const secreate = process.env.SECRET_KEY;
    const token = req.header('Authorization')?.split(' ')[1] // expacting token in "Bearer <token>" format

    if (!token) return res.status(403).json({ message: "Token missing" });


    try {
        const decoded = jwt.verify(token, secreate);
        req.userId = decoded.id;
        next(); // continue to the next middleware or route handle
    } catch (error) {
        res.status(401).json({ message: "invalid token" })
    }
}

export default authenticatedToken;