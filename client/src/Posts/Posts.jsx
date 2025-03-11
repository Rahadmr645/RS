import React, { useContext, useEffect } from 'react';
import { Context } from '../context/StoreContext';

const Posts = () => {
    const { posts, fetchPosts, loading } = useContext(Context);

    useEffect(() => {
        fetchPosts();
    }, []);

    // Debugging: Log posts only when available
    useEffect(() => {
        if (posts) console.log("posts data:", posts);
    }, [posts]);

    return (
        <div>
            <h2>All Posts</h2>
            {loading && <p>Loading posts...</p>}
            {!posts?.length && <p>No posts available</p>}

            {posts?.map((post) => (
                <div key={post._id} style={{ border: '1px solid red', padding: '10px', marginBottom: '10px' }}>

                    {/* ✅ Fix Image Rendering */}
                    {/* {post.image ? (
                        <img
                            src={`http://localhost:4003/postImage/${post.image}`}
                            alt='Post'
                            width="50"
                            height="50"
                            style={{ borderRadius: "50%" }}
                        />
                    ) : (
                        <p>Post image not available</p>
                    )} */}

                    {/* ✅ Fix User ID Rendering */}
                    <p>User Id : {post.userId || "User ID not available"}</p>

                    {/* ✅ Post Text */}
                    <p>{post.text}</p>

                    {/* ✅ Fix Another Image Rendering  */}
                    {post.image ? (
                        <img
                            src={`http://localhost:4003/postImage/${post.image}`}
                            alt='Post'
                            width='300'
                        />
                    ) : (
                        <p>Post image not available</p>
                    )}

                </div>
            ))}
        </div>
    );
};

export default Posts;
