import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/StoreContext'
import Posts from '../Posts/Posts';
// import Navbar from '../Navbar/Navbar'
import styles from './Dashboard.module.css'
import SideNav from '../SideNav/SideNav';
import { Route, Routes } from 'react-router-dom';

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
      <div className={styles.itemContainer}>
        <SideNav className={styles.left} />
        {/* routes section */}
        <Routes>
          <Route path='/dashbord' element={<Posts className={styles.middle} />} />
        </Routes>

        <div className={styles.right}></div>
      </div>
    </div>
  )
}

export default Dashboard