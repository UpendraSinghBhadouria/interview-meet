import React from 'react'
import Navbar from '../components/Navbar'
import DharmendraSirImg from '../assets/dharmendra-sir.JPG';
import NancyImg from '../assets/nancy.jpg';
import UpendraImg from '../assets/upendra.jpg';
import RahulImg from '../assets/rahul.JPG';

const teamMembers = [
    {
        id: 1,
        name: "Dharmendra Pandey Sir",
        role: "Mentor",
        desc: "As an Assistant Professor, I guide students in reshaping recruitment through Interview Meet's innovative platform.",
        img: DharmendraSirImg
    },
    {
        id: 2,
        name: "Nancy Rajput",
        role: "UI/UX Designer",
        desc: "I design and implement the UI of the project using HTML, CSS, and Tailwind CSS.",
        img: NancyImg
    },
    {
        id: 3,
        name: "Rahul Mongia",
        role: "Devops Engineer",
        desc: "I handle all aspects of the deployment process for Interview Meet.",
        img: RahulImg
    },
    {
        id: 4,
        name: "Upendra Singh Bhadouria",
        role: "MERN Stack Developer",
        desc: "I create client-server connections via web sockets and build server using express.js, ensuring robust communication for Interview Meet.",
        img: UpendraImg
    },
]

const OurTeam = () => {
    return (
        <div className='h-screen w-screen bg-gray-100'>
            <div className='h-[70px]'>
                <Navbar />
            </div>
            <section className="text-gray-600 body-font bg-gray-100">
                <div className="container px-5 pt-16 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">OUR TEAM</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Gratitude to every team member for their dedication, expertise, and collaborative spirit, vital in shaping Interview Meet's success.</p>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        
                        {teamMembers.map((member) => (
                            <div className="p-4 lg:w-1/2" key={member.id}>
                                <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                                    <img
                                        alt="team"
                                        className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                                        src={member.img}
                                    />
                                    <div className="flex-grow sm:pl-8">
                                        <h2 className="title-font font-medium text-lg text-gray-900">{member.name}</h2>
                                        <h3 className="text-gray-500 mb-3">{member.role}</h3>
                                        <p className="mb-4">{member.desc}</p>
                                        <span className="inline-flex">
                                            <a className="text-gray-500">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                                </svg>
                                            </a>
                                            <a className="ml-2 text-gray-500">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                                </svg>
                                            </a>
                                            <a className="ml-2 text-gray-500">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                                </svg>
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

        </div>
    )
}

export default OurTeam
