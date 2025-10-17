import React from 'react'
import Navbar from '../components/LandingPage/Navbar'

import HeroSection from '../components/LandingPage/HeroSection'
import Footer from '../components/LandingPage/Footer'
import FeaturesSection from '../components/LandingPage/FeaturesSection'
import ImpactSection from '../components/LandingPage/ImpactSection'
import { HowItWorks } from '../components/LandingPage/HowItWorks'
import ImpactMetrics from '../components/LandingPage/ImpactMetrics'
import CommunitySection from '../components/LandingPage/CommunitySection'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <FeaturesSection/>
      <ImpactSection/>
      <HowItWorks/>
      <ImpactMetrics/>
      <CommunitySection/>
      <Footer/>
      
    </div>
  )
}

export default Home