import mongoose from 'mongoose'



const postSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true,
    },
    text: {
        type: String,
        required: true
    },
    image: {
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
const Post = mongoose.model('post', postSchema);

export default Post;