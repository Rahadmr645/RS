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
    }
})
const Post = mongoose.model('post', postSchema);

export default Post;