import { createContext, useState } from "react";
import { useRef } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import base64url from 'base64url'




export const Context = createContext();


export const ContextProvider = ({ children }) => {

    const [currState, setCurrState] = useState('Signup');

    const fileInputRef = useRef(null);
    const navigate = useNavigate();
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

    // onsubmithandler

    const onSubmitHandler = async (e) => {

        e.preventDefault();
        try {
            let respons;
            const formData = new FormData();
            if (currState === 'Signup') {

                formData.append("name", userFormData.name);
                formData.append("email", userFormData.email);
                formData.append("password", userFormData.password); formData.append("image", userFormData.image);
                respons = await axios.post(`${URL}/api/user/create`, formData)
                alert(respons.data.message)

                setUserFormData({
                    name: '',
                    email: '',
                    password: '',
                    image: '',
                })

                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }

                localStorage.setItem('token', respons.data.token)

                navigate('/dashboard');
            } else {
                respons = await axios.post(`${URL}/api/user/login`, {
                    email: userFormData.email,
                    password: userFormData.password,
                })
                alert(respons.data.message)
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
                throw new error('Invalid error')
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


    const contextValu = {
        currState,
        setCurrState,
        onChangeHandler,
        onSubmitHandler,
        userFormData,
        decodeToken,

    }



    return (
        <Context.Provider value={contextValu} >
            {children}
        </Context.Provider>
    )
}