import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './Pages/Home'
import ProjectManage from './Pages/ProjectManage'


const App = () => {
  return (
    <>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Project" element={<ProjectManage />} />
    </Routes>
    </>
  )
}

export default App
