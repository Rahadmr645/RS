import React, { useContext, useEffect } from 'react';
import { Context } from '../context/StoreContext';
import styles from './Post.module.css';
import { SlLike } from "react-icons/sl";
import { FaComments } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
const Posts = ({ className }) => {
    const { posts, fetchPosts, loading, handleDeletePost } = useContext(Context);

    useEffect(() => {
        fetchPosts();
    }, []);

    // Debugging: Log posts only when available
    useEffect(() => {
        if (posts) console.log("posts data:", posts);
    }, [posts]);

    return (
        <div className={`${className}`}>
            <h2>All Posts</h2>
            {loading && <p>Loading posts...</p>}
            {!posts?.length && <p>No posts available</p>}

            {posts?.map((post) => (
                <div className={styles.postBox} key={post._id} style={{ border: '1px solid red', padding: '10px', marginBottom: '10px' }}>
                    <p>User Id : {post.userId || "User ID not available"}</p>
                    <p>{post.text}</p>
                    {post.image ? (
                        <div className={styles.imageBox}>
                            <img
                                src={`http://localhost:4003/postImage/${post.image}`}
                                alt='Post'
                                width='300'
                            />
                            <div className={styles.reactIcons}>
                                <p><SlLike /></p>
                                <p><FaComments /></p>
                                <p><IoIosShareAlt /></p>
                            </div>

                        </div>

                    ) : (
                        <p>Post image not available</p>
                    )}
                    <button onClick={() => handleDeletePost(post._id)}>Delete Post</button>
                </div>
            ))}
        </div>
    );
};

export default Posts;
