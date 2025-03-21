import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context/StoreContext';
import styles from './Post.module.css';
import { SlLike } from "react-icons/sl";
import { FaComments } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";

const Posts = ({ className }) => {
    const { posts, fetchPosts, loading, handleDeletePost, toggleLike } = useContext(Context);

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

                    {post.userId ? (
                        <>
                            <p>User Name: {post.userId.name}</p>
                            <p>Email: {post.userId.email}</p>
                            <p>Likes: {post.likes.length}</p> {/* Corrected here */}
                            <img style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid green' }} src={`http://localhost:4003/uploads/${post.userId.image}`} alt="User" />
                        </>
                    ) : (
                        <p>User data not available</p>
                    )}

                    <p>{post.text}</p>
                    <p>Post ID: {post._id}</p>

                    {post.image ? (
                        <div className={styles.imageBox}>
                            <img
                                src={`http://localhost:4003/postImage/${post.image}`}
                                alt="Post"
                                width="300"
                            />
                            <div className={styles.reactIcons}>
                                <div className={styles.likes}>
                                    <button onClick={() => toggleLike(post._id)}>
                                       
                                    {post.likes.includes(localStorage.getItem('userId')) ? 'like' : 'UnLike'}
                                        
                                    </button>
                                    <span>{post.likes.length} Likes</span> {/* Corrected here */}
                                </div>
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
