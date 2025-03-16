import { createContext, use, useEffect, useState } from "react";
import { useRef } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
// import base64url from 'base64url'




export const Context = createContext();


export const ContextProvider = ({ children }) => {

    const [currState, setCurrState] = useState('Signup');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const [showPostForm, setShowPostForm] = useState(false);

    const [postForm, setPostForm] = useState({
        text: '',
        image: '',
    })


    const [userFormData, setUserFormData] = useState({
        name: '',
        email: '',
        password: '',
        image: '',
    })
    const URL = 'http://localhost:4003'

    // onChangeHandler
    const onChangeHandler = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image') {
            setUserFormData((prev) => ({

                ...prev,
                image: files[0],
            }));
        } else {
            setUserFormData((prev) => ({
                ...prev,
                [name]: value,
            }))
        }
    }

    const onPostChangeHandler = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image') {
            setPostForm((prev) => ({

                ...prev,
                image: files[0],
            }));
        } else {
            setPostForm((prev) => ({
                ...prev,
                [name]: value,
            }))
        }
    }

    // onsubmithandler

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
                response = await axios.post(`${URL}/api/user/create`, formData)
                alert(response.data.message)

                setUserFormData({
                    name: '',
                    email: '',
                    password: '',
                    image: '',
                })

                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }

                localStorage.setItem('token', response.data.token)

                navigate('/dashboard');
            } else {
                response = await axios.post(`${URL}/api/user/login`, {
                    email: userFormData.email,
                    password: userFormData.password,
                })
                alert(response.data.message)
            }
            navigate('/dashboard')
        } catch (error) {
            alert(error.respons?.data?.message || 'an error ')
        }
    }






    // decode the token
    const decodeToken = (token) => {
        try {
            // splits the token in the header payload and signature
            const parts = token.split('.');

            if (parts.length !== 3) {
                throw new Error('Invalid error')
            }
            const headerBase = parts[0];
            const payloadBase = parts[1];
            const signatureBase = parts[2];


            const header = JSON.parse(atob(headerBase.replace(/_/g, '/').replace(/-/g, '+')));
            const payload = JSON.parse(atob(payloadBase.replace(/_/g, '/').replace(/-/g, "+")));
            return {
                header: header,
                payload: payload
            }

        } catch (error) {
            console.log("erro is ", error.message)
        }

    }



    // fetch all the post 
    const fetchPosts = async () => {
        try {

            setLoading(true);
            const response = await axios.get(`${URL}/api/user/post/all-posts`);
            // console.log("fetched post", response.data);
            setPosts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching posts:', error.response?.data?.message || error.message);
            setLoading(false);
        }
    }


    // for deleting post
    const handleDeletePost = async (postId) => {
        try {
            const response = await axios.delete(`${URL}/api/user/post/delete`, {
                data: { id: postId } // axios requires data to send  body in delete request
            });
            alert("Post deleted successfully");

            setPosts(posts.filter(post => post._id !== postId));

        } catch (error) {
            console.error("Failed to delete post:", error);
            alert("Failed to delete post:" + error.response?.data?.message)
        }
    }

    // onsubmit for create post 
    const PostSubmit = async (e) => {
        e.preventDefault();

        try {
            let response;
            const postForm = new PostData();

            postForm.append = ("text", setPostForm.text);
            postForm.append = ("image", setPostForm.image);

            response = await axios.post(`${URL}/api/user/post/create`, postForm);
            alert(response.data.message);

            setPostForm({
                text: '',
                image: '',
            });

            setShowPostForm(false);
        } catch (error) {
            console.error('error is:', error.message)
        }
    }




    // call fetchPost when  the component loads
    useEffect(() => {
        fetchPosts();
    }, [])

    const contextValu = {
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
    }



    return (
        <Context.Provider value={contextValu} >
            {children}
        </Context.Provider>
    )
}