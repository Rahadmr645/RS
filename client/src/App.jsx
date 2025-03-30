import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Login/Login'
import Navbar from './Navbar/Navbar'
import Dashboard from './Dashboard/Dashboard'

const App = () => {
  return (
    <div>
       <Navbar/>
      <Routes >
        <Route path='/dashbord' element={<Dashboard />} />
        <Route path='/' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App