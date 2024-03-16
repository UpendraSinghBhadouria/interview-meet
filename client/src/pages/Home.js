import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

const Home = () => {
    return (
        <div className='w-screen h-screen bg-zinc-200'>
            <div className='h-[70px]'>
                <Navbar />
            </div>
            <div className='h-[calc(100vh-70px)]'>
                <Hero />
            </div>
        </div>
    )
}

export default Home
