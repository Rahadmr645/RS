import { createContext, useEffect, useState, useRef } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [currState, setCurrState] = useState('Signup');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const [allUser, setAllUser] = useState([]);
    const [showPostForm, setShowPostForm] = useState(false);

    const [postForm, setPostForm] = useState({
        text: '',
        image: null,
    });

    const [userFormData, setUserFormData] = useState({
        name: '',
        email: '',
        password: '',
        image: '',
    });

    const URL = 'http://localhost:4003';

    // onChangeHandler for user form
    const onChangeHandler = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image') {
            setUserFormData(prev => ({
                ...prev,
                image: files[0],
            }));
        } else {
            setUserFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // onChangeHandler for post form
    const onPostChangeHandler = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image') {
            setPostForm(prev => ({
                ...prev,
                image: files[0],
            }));
        } else {
            setPostForm(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // onSubmitHandler for user form (Signup/Login)
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            let response;
            const formData = new FormData();
            if (currState === 'Signup') {
                formData.append("name", userFormData.name);
                formData.append("email", userFormData.email);
                formData.append("password", userFormData.password);
                formData.append("image", userFormData.image);

                response = await axios.post(`${URL}/api/user/create`, formData);
                alert(response.data.message);

                setUserFormData({
                    name: '',
                    email: '',
                    password: '',
                    image: '',
                });

                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }

                localStorage.setItem('token', response.data.token);
                navigate('/dashboard');
            } else {
                response = await axios.post(`${URL}/api/user/login`, {
                    email: userFormData.email,
                    password: userFormData.password,
                });
                alert(response.data.message);
                navigate('/dashboard');
            }
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred');
        }
    };

    // Decode token for validation
    const decodeToken = (token) => {
        try {
            const parts = token.split('.');
            if (parts.length !== 3) {
                throw new Error('Invalid token format');
            }

            const headerBase = parts[0];
            const payloadBase = parts[1];
            const header = JSON.parse(atob(headerBase.replace(/_/g, '/').replace(/-/g, '+')));
            const payload = JSON.parse(atob(payloadBase.replace(/_/g, '/').replace(/-/g, "+")));
            return { header, payload };
        } catch (error) {
            console.log("Error decoding token:", error.message);
        }
    };

    // Fetch all posts
    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${URL}/api/user/post/all-posts`);
            setPosts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching posts:', error.response?.data?.message || error.message);
            setLoading(false);
        }
    };

    // Handle post deletion
    const handleDeletePost = async (postId) => {
        try {
            const response = await axios.delete(`${URL}/api/user/post/delete`, {
                data: { id: postId },
            });
            alert("Post deleted successfully");
            setPosts(posts.filter(post => post._id !== postId));
        } catch (error) {
            console.error("Failed to delete post:", error);
            alert("Failed to delete post: " + error.response?.data?.message);
        }
    };

    // // Submit post form
    // const PostSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const formData = new FormData();
    //         formData.append("text", postForm.text);

    //         if (postForm.image instanceof File) {
    //             formData.append("image", postForm.image);
    //         } else {
    //             console.warn("Image is not a file:", postForm.image);
    //         }

    //         const token = localStorage.getItem('token');
    //         if (!token) {
    //             alert('User not authenticated. Please log in.');
    //             return;
    //         }

    //         const response = await axios.post(`${URL}/api/user/post/create`, formData, {
    //             headers: { 'Authorization': `Bearer ${token}` },
    //         });

    //         alert(response.data.message);
    //         await fetchPosts();
    //         setPostForm({ text: '', image: null });
    //         setShowPostForm(false);
    //         navigate('/dashboard');
    //     } catch (error) {
    //         console.error('Error creating post:', error.response?.data?.message || error.message);
    //         alert("Error creating post: " + (error.response?.data?.message || error.message));
    //     }
    // };

    const PostSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("text", postForm.text);
    
            if (postForm.image && postForm.image instanceof File) {
                formData.append("image", postForm.image);
            } else {
                console.warn("Invalid image format:", postForm.image);
            }
    
            const token = localStorage.getItem('token');
            if (!token) {
                alert('User not authenticated. Please log in.');
                return;
            }
    
            const response = await axios.post(`${URL}/api/user/post/create`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            console.log("Server Response:", response);
            alert(response.data.message);
            await fetchPosts();
            
            setPostForm({ text: '', image: '' }); // Ensure proper reset
            setShowPostForm(false);

            setTimeout(() => {
                navigate('/dashboard');
            }, 100);  // Add a small delay before navigation
    
    
        } catch (error) {
            console.error('Error creating post:', error.response?.data || error.message);
            alert("Error creating post: " + (error.response?.data?.message || error.message));
        }
    };

    const fetchAllUser = async () => {

        try {
            const respons = await axios.get(`${URL}/api/user/allUser`);
            setAllUser(respons.data.user);
        } catch (error) {
            alert(respons.data.error)
        }
    }

    // Delte the user 
    const deleteUser = async (userId) => {
        try {
            const response = await axios.delete(`${URL}/api/user/delete`, { data: { id: userId } })
            alert(response.data.message);
            setAllUser(allUser.filter(user => user._id !== userId));
        } catch (error) {
            console.error('faild to delte user', error.message)
        }

    }


    // Fetch posts on component load
    useEffect(() => {
        fetchPosts();
        fetchAllUser();
    }, []);

    useEffect(() => {
        console.log(allUser);
    }, [allUser])

    const updateLikes = (postId) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post._id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
            )
        );
    };
    const contextValue = {
        currState,
        setCurrState,
        onChangeHandler,
        onSubmitHandler,
        userFormData,
        decodeToken,
        fetchPosts,
        posts,
        loading,
        handleDeletePost,
        setPostForm,
        postForm,
        showPostForm,
        setShowPostForm,
        onPostChangeHandler,
        PostSubmit,
        allUser,
        setAllUser,
        deleteUser,
        updateLikes,
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};
