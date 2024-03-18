import React from 'react'
import Navbar from '../components/Navbar'
import IPSImg from '../assets/ips.jpg';
import IPSLogo from '../assets/ips_logo.jpg';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className='h-screen w-screen no-scrollbar overflow-y-scroll bg-gray-100'>
      <div className='h-[70px]'>
        <Navbar />
      </div>
      <section className="text-gray-600 body-font h-[calc(100vh-70px)]">
        <div className="container px-5 pt-16 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <div className="rounded-lg h-64 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src={IPSImg}
              />
            </div>
            <div className="flex flex-col sm:flex-row mt-4">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="w-28 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                <img src={IPSLogo} alt='LOGO' className='h-full w-full rounded-lg'/>
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">Interview Meet</h2>
                  <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4" />
                  <p className="text-base">Interview Meet is a collaborative platform where interviewers and applicants convene for interactive sessions.</p>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <p className="leading-relaxed text-lg mb-4">Interview Meet is a pioneering project developed by students of IPS College of Technology and Management, Gwalior. Designed to streamline the recruitment process, our platform facilitates direct engagement between interviewers and applicants, fostering efficiency and collaboration. Powered by innovation and driven by a commitment to excellence, Interview Meet represents the cutting edge of recruitment technology developed by the bright minds of IPS College.</p>
                <Link to="/our-team" className="text-indigo-500 inline-flex items-center">Our Team
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default About
