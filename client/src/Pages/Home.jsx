import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Features from '../Components/About'
import Footer from '../Components/Footer'
import ProblemSection from '../Components/Problem'
import SolutionSection from '../Components/Solution'


const Home = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <ProblemSection/>
    <SolutionSection/>
    <Features/>
    <Footer/>
    </>
      
    
  )
}

export default Home
