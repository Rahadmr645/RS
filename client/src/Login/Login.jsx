import React, { useContext, useState } from 'react'
import styles from './Login.module.css'
import { Context } from '../context/StoreContext'
const Login = () => {
    const { currState, setCurrState, userFormData, onChangeHandler, onSubmitHandler } = useContext(Context);
    return (
        <div className={styles.lergContainer}>
            <form onSubmit={onSubmitHandler} className={styles.loginContainer}>
                <h1>
                    {currState}
                </h1>
                <div className={styles.inputs}>
                    {currState === 'Signup' ?
                        <>
                            <div className={styles.input}>
                                <input type="file"
                                    id='image'
                                    name='image'
                                    onChange={onChangeHandler}
                                    placeholder='enter image' />
                            </div>
                            <div className={styles.input}>
                                <label htmlFor="username">Username</label>
                                <input type="text"
                                    id='username'
                                    name='name'
                                    onChange={onChangeHandler}
                                    value={userFormData.name}
                                    placeholder='enter name' />
                            </div>
                        </>
                        : <></>
                    }

                    <div className={styles.input}>
                        <label htmlFor="email">Email</label>
                        <input type="email"
                            id='email'
                            name='email'
                            onChange={onChangeHandler}
                            value={userFormData.email}
                            placeholder='enter email' />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="password">Password</label>
                        <input type="password"
                            id='password'
                            name='password'
                            onChange={onChangeHandler}
                            value={userFormData.password}
                            placeholder='enter password' />
                    </div>
                    <button type='submit'>submit</button>
                    <div className={styles.haveAccount}>
                        {currState === "Login" ?
                            <p>Don't  have account <span onClick={() => setCurrState("Signup")}> click here</span></p> : <p>Already have account <span onClick={() => setCurrState("Login")}>click here</span></p>
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login