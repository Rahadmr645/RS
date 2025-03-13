import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/StoreContext'
import Posts from '../Posts/Posts';
import Navbar from '../Navbar/Navbar'
import styles from './Dashboard.module.css'
import SideNav from '../SideNav/SideNav';

const Dashboard = () => {
  const { decodeToken } = useContext(Context);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const storeToken = localStorage.getItem('token')
    if (storeToken) {
      setToken(storeToken);
      const decoded = decodeToken(storeToken);
      setUserData(decoded?.payload || null)
    }
  }, [])
  const logout = () => {
    localStorage.removeItem('token');

  }

  return (
    <div className={styles.dashboardContainer}>
      <Navbar />
      <div className={styles.itemContainer}>
        <SideNav className={styles.left} />
        {/* <button onClick={logout} >Logout</button> */}
        {/* <p>{userData?.name}</p> */}
        <Posts  className={styles.middle} />
        <div className={styles.right}></div>
      </div>
    </div>
  )
}

export default Dashboard