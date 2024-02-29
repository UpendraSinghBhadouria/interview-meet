import React from 'react'
import Navbar from '../components/Navbar'

const Video = () => {
  return (
    <div className='h-screen w-screen'>
      <div className='h-[70px]'>
        <Navbar />
      </div>
      <div className="relative flex-1 h-[calc(100vh-70px)] p-4">
        {/* stranger video screen */}
        <div className="h-full w-full bg-gray-100 border rounded-xl">
          <video autoPlay muted loop>
            <source src="/videos/video-1.mp4" type="video/mp4" />
          </video>
        </div>
        {/* my video screen */}
        <div className="absolute bottom-4 right-4 w-[320px] h-[200px] bg-white border rounded-xl">
          <video autoPlay muted loop>
            <source src="/videos/video-2.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  )
}

export default Video
