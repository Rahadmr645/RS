import express from 'express'
import dotenv from 'dotenv'
import connectToMongo from './config/db.js';
dotenv.config();
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
const app = express();
const port = process.env.port;


connectToMongo();
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use(express.json());

// all routes
app.use('/api/user/', userRoutes)
app.use('/api/user/post/', postRoutes)


app.use('/', (req, res) => {
    res.send('welcome')
});

app.listen(port, () => {
    console.log(`app is running on http://localhost:${port}`)
})