import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import ProjectManage from './Pages/ProjectManage'
import ProjectIdeaGenerator from './Pages/Idea'
import ProtectedRoute from './Components/ProtectedRoute'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/project" element={
        <ProtectedRoute>
          <ProjectManage />
        </ProtectedRoute>
      } />
      <Route path="/idea" element={<ProjectIdeaGenerator />} />
    </Routes>
  )
}

export default App
