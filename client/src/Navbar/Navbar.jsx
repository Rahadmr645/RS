import React from 'react' 
import styles from './Navbar.module.css'
import { IoMdAddCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdHomeFilled } from "react-icons/md";
import { IoMdPeople } from "react-icons/io";
import { BsMessenger } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { MdHomeRepairService } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GoFileMedia } from "react-icons/go";
const Navbar = () => {
  return (
   
    <div className={styles.navContainer}>
      <div className={styles.topNav}>
        <div className={styles.logo} >
          <h1>FACEBOOK</h1>
        </div>
        <div className={styles.topIcon} >
          <p><IoMdAddCircle /></p>
          <p><FaSearch /></p>
          <p><GiHamburgerMenu /></p>
        </div>
      </div>
      <div className={styles.bottomNav}>
        <p><MdHomeFilled /></p>
        <p><IoMdPeople /></p>
        <p><BsMessenger /></p>
        <p><IoIosNotificationsOutline /></p>
        <p><MdOutlineOndemandVideo /></p>
        <p><MdHomeRepairService /></p>
      </div>
      <hr/>
      <div className={styles.profileNav}>
        <div className={styles.profile}>
        <p><CgProfile /></p>
      </div>
      <div className={styles.input} >
        <input type="text" placeholder="Whats in your mind?" />
      </div>
      <div className={styles.media}>
        <p><GoFileMedia /></p>
        <h5 >photo</h5>
      </div>
      </div>
    </div>
    
   
    )
}

export default  Navbar;