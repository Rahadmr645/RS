import express from "express";
import Post from "../models/Post.js";
import authenticatedToken from "../middleware/authenticatedToken.js";
import imageUpload from "../middleware/postMulter.js";

const router = express.Router();


//route 01: create post

router.post('/create', authenticatedToken, imageUpload.single('image'), async (req, res) => {

    try {
        const { text } = req.body;
        const image = req.file ? req.file.filename : null;
        const userId = req.userId; // get the userid from the authenticated token
        const post = new Post({
            text,
            userId,
            image,
        });

        await post.save();
        res.status(200).json({ message: "Posted succesfully", post });

    } catch (error) {
        res.status(500).json({ message: "faild to post", error: error.message })
    };
});

// fetch all the post of perticuler user
router.get('/user-posts', authenticatedToken, async (req, res) => {

    try {
        const userId = req.userId;

        const posts = await Post.find({ userId });

        if (!posts || posts.length === 0) return res.status(400).json({ message: "No post yet" });

        res.status(200).json({ message: "Fetch succesfully", posts })
    } catch (error) {
        res.status(500).json({ message: "Faild to fetch ", error: error.message })
    }
})



// Delete post 
router.delete('/delete', async (req, res) => {

    try {

        const { id } = req.body;

        // find the post
        await Post.findByIdAndDelete(id)

        res.status(200).json({ message: "Post Deleted successfully" })

    } catch (error) {
        res.status(500).json({ message: "faild to delete post", error: error.message })
    }

})


// fetch all the post 
router.get('/all-posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "faild to fetch posts" })
    }
})




export default router;