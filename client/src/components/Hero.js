import React from 'react'
import InterviewMeetImg from '../assets/interview-meet.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
const Hero = () => {
  const { roomId } = useSelector(state => state.room);

  return (
    <div name='home' className='w-full h-full bg-zinc-200 flex flex-col justify-between'>
        <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
            <div className='flex flex-col justify-center md:items-start w-full px-2 py-8'>
                <p className='text-2xl'>Where Aspirations Meet Opportunities.</p>
                <h1 className='py-3 text-5xl md:text-7xl font-bold'>Interview Meet</h1>
                <p className='text-2xl'>Seamless Interviews, Boundless Possibilities.</p>
                <Link to={`/video/${roomId}`} className='text-white border bg-indigo-600 border-indigo-600 hover:bg-transparent hover:text-indigo-600 rounded-md py-3 px-6 sm:w-[60%] my-4 text-center'>Get Started</Link>
            </div>
            <div className='bg-zinc-200'>
                <img className='w-full h-[400px] sm:h-full' src={InterviewMeetImg} alt="/" />
            </div>
    
        </div>
    </div>
  )
}

export default Hero