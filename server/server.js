import express from 'express'
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const port = process.env.port;


app.use(express.json);

app.use('/',(req,res) => {
    res.send('welcome')
});



app.listen(port,() => {
    console.log(`app is running on http://localhost:${port}`)
})