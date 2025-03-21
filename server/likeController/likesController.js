import Post from '../models/Post.js'; // Import the Post model

// Toggle Like on a Post
export const toggleLikePost = async (req, res) => {
  try {
    const { postId } = req.params; // Get post ID from request URL
    const userId = req.user.id; // Get user ID from authentication middleware

    // Find the post in the database
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' }); // Return error if post doesn't exist
    }

    // Check if the user already liked the post
    const hasLiked = post.likes.includes(userId);


    if (hasLiked) {
      // If user already liked the post, remove their like (unlike)
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      // If user hasn't liked the post, add their like
      post.likes.push(userId);
    }

    await post.save(); 

    res.json({
      success: true,
      likes: post.likes.length, // Send back the updated like count
      message: hasLiked ? 'Post unliked!' : 'Post liked!', // Send message based on action
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
