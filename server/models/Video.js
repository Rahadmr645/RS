import mongoose from 'mongoose'



const videoSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true,
    },
    header: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }], // array of users who liked
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
            text: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ]

}, { timestamps: true })
const postVideo = mongoose.model('video', videoSchema);

export default postVideo;