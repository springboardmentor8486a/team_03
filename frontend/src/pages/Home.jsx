import React from 'react'
import Navbar from '../components/Navbar'

import HeroSection from '../components/HeroSection'
import Footer from '../components/Footer'
import FeaturesSection from '../components/FeaturesSection'
import ImpactSection from '../components/ImpactSection'
import { HowItWorks } from '../components/HowItWorks'
import ImpactMetrics from '../components/ImpactMetrics'
import CommunitySection from '../components/CommunitySection'

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