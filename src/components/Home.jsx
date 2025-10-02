import React from 'react'
import Hero from './Hero'
import EnhancedEventTicker from './EnhancedEventTicker'
import Events from './Events'

const Home = ({ selectedLanguage, setSelectedLanguage }) => {
  return (
    <>
      <Hero selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
      <EnhancedEventTicker />
      <Events selectedLanguage={selectedLanguage} />
    </>
  )
}

export default Home