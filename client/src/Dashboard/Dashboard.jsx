import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/StoreContext'
import Posts from '../Posts/Posts';


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
    <div>
      <button onClick={logout} >Logout</button>
      <p>{userData?.name}</p>
      <Posts />
    </div>
  )
}

export default Dashboard