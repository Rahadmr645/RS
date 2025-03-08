import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();


const DB_URL = process.env.DB_URL;
const connectToMongo = async () => {

    try {
        await mongoose.connect(DB_URL, {});
        console.log('DB Connected')
    } catch (error) {
        console.log('Faild to connect DB', error)
    }
}

export default connectToMongo;