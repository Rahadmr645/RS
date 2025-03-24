import Post from '../models/Post.js'

// toggle like on a post 
export const toggleLikePost = async (req, res) => {


    try {
        const { postId } = req.params // get post id from request url
        const userId = req.user.id; // get user ID from authentiction middleware

        // find the post in the database
        const post = await Post.findById(postId);


        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // check if the user already liked the post 
        const hasLiked = post.likes.includes(userId);

        if (hasLiked) {
            // if user already liked the post remove their like unlike
            post.likes = post.likes.filter((id) => id.toString() !== userId);
        } else {
            //if user hasn't liked the post add their like
            post.likes.push(userId);
        }

        await post.save(); // save changes in the database

        res.json({
            success: true,
            likes: post.likes.length, // send back the updated like count
            message: hasLiked ? 'Post unliked!' : 'Post liked!', // send message based on action 

        })

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}