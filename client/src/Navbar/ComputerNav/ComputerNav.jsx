import React, { useContext, useState } from 'react'
import styles from './ComputerNav.module.css'
import { CiSearch } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import { MdHomeFilled } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { MdOndemandVideo } from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { TbGridDots } from "react-icons/tb";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { GiKnockedOutStars } from "react-icons/gi";
import { Context } from '../../context/StoreContext';
import PostForm from '../../PostForm/PostForm';
import { Link } from 'react-router-dom';

const ComputerNav = () => {


    const [select, setSelect] = useState('home');
    const { setShowPostForm, showPostForm } = useContext(Context);

    return (
        <>
            {showPostForm && <PostForm />}

            <div className={styles.navContainer}>
                <div className={styles.itemContainer}>
                    <div className={styles.leftContainer}>
                        <p><FaFacebook /></p>
                        <div className={styles.inputBox}>
                            <input id='search' type="text" placeholder='Search facbook' />
                            <label className={styles.i} htmlFor='search' ><CiSearch /></label>
                        </div>
                    </div>
                    <div className={styles.middleContainer}>
                        <Link to='/' > <p onClick={() => setSelect('home')} className={select === 'home' ? styles.select : ''}   ><MdHomeFilled /></p> </Link>
                        <p onClick={() => setSelect('people')} className={select === 'people' ? styles.select : ''}  ><IoPeopleOutline /></p>
                        <Link to="/video" >  <p onClick={() => setSelect('video')} className={select === 'video' ? styles.select : ''}  ><MdOndemandVideo /></p> </Link>
                        <Link to='/page'>  <p onClick={() => setSelect('page')} className={select === 'page' ? styles.select : ''}  ><SiHomeassistantcommunitystore /></p> </Link>
                        <Link to='stars' >  <p onClick={() => setSelect('stars')} className={select === 'stars' ? styles.select : ''}  ><GiKnockedOutStars /></p> </Link>
                    </div>
                    <div className={styles.rightContainer}>
                        <p><TbGridDots /></p>
                        <p><FaFacebookMessenger /></p>
                        <p><IoIosNotifications /></p>
                        <p><CgProfile /></p>
                    </div>

                </div>
                <div className={styles.postContainer}>
                    <button onClick={() => setShowPostForm(true)} >Add Post</button>
                </div>

            </div>

        </>
    )
}

export default ComputerNav