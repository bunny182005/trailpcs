import React from 'react'
import Nav from '../Components/Nav.jsx'

const Home = () => {
  return (
    <div className="fixed inset-0 bg-white w-full overflow-hidden">
      <Nav />
      <div className='w-full h-screen flex items-center justify-center relative'>
        {/* Text Content - Fully Responsive */}
        <div className='w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-32 relative z-10'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-black text-center leading-tight mb-2 sm:mb-3 md:mb-4'>
            Communication for the <span className="text-blue-400">Soul,</span>
          </h1>
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-black text-center leading-tight'>
            Innovation for the <span className="text-blue-400">Mind.</span>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Home;