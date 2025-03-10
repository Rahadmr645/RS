import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Login/Login'
import Dashboard from './Dashboard/Dashboard'

const App = () => {
  return (
    <div>
      <Routes >
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App