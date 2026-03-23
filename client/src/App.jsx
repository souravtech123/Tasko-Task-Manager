import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import ProjectManage from './Pages/ProjectManage'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/project" element={<ProjectManage />} />
 
    </Routes>
  )
}

export default App
