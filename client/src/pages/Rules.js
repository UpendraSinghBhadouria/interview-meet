import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const rules = [
    {
        id: 1,
        text: "Respect, professionalism, and punctuality"
    },
    {
        id: 2,
        text: "Adhere to ethical guidelines strictly"
    },
    {
        id: 3,
        text: "Maintain confidentiality and data security"
    },
    {
        id: 4,
        text: "Uphold honesty and transparency throughout"
    },
    {
        id: 5,
        text: "Respect intellectual property and copyrights"
    },
    {
        id: 6,
        text: "Prohibit sharing of inappropriate content"
    },
]

const Rules = () => {
    return (
        <div className='h-screen w-screen no-scrollbar overflow-y-scroll bg-gray-50'>
            <div className='h-[70px]'>
                <Navbar />
            </div>

            <section className="text-gray-600 bg-gray-50 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="text-center mb-20">
                        <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">Rules and Regulations</h1>
                        <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">Outlined regulations ensure adherence to standards, fostering a professional and respectful atmosphere within Interview Meet.</p>
                    </div>
                    <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">

                        {rules.map((rule) => (
                            <div className="p-2 sm:w-1/2 w-full" key={rule.id}>
                                <div className="bg-gray-200 rounded flex p-4 h-full items-center">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                        <path d="M22 4L12 14.01l-3-3" />
                                    </svg>
                                    <span className="title-font font-medium">{rule.text}</span>
                                </div>
                            </div>
                        ))}

                    </div>
                    <Link to="/">
                    <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Continue</button>
                    </Link>
                </div>
            </section>

        </div>
    )
}

export default Rules
