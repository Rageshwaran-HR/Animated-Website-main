import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Hero from './components/Hero'
import About from './components/About'
import Navbar from './components/Navbar'
import Features from './components/Features'
import Story from './components/Story'
import Contact from './components/Contact'
import Footer from './components/Footer'
import EventDetails from './pages/EventDetails'
import BackgroundAudio from './components/BackgroundAudio'

const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  React.useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    const id = hash.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    // Fallback for elements rendered after route change.
    const t = setTimeout(() => {
      const late = document.getElementById(id);
      if (late) late.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);

    return () => clearTimeout(t);
  }, [hash, pathname]);

  return null;
};

const Home = () => (
  <>
    <Hero />
    <About />
    <Features />
    <Story />
    <Contact />
    <Footer />
  </>
);

const App = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <BackgroundAudio />
      <Navbar />
      <ScrollToHash />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/events/:slug' element={<EventDetails />} />
      </Routes>
    </main>
  )
}

export default App