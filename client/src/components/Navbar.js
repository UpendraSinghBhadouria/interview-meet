import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdMenu } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import AuthContext from '../context/authContext';

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const { currentUser,logout } = useContext(AuthContext);
    const handleNav = () => {
        setNav(prev => !prev);
    }

    return (
        <div className='w-screen h-full bg-zinc-200 drop-shadow-lg'>
            <div className='px-2 flex items-center justify-between w-full h-full'>
                <div className='flex items-center'>
                    <Link to="/" className='text-3xl font-bold sm:text-4xl font-signature text-indigo-600'>Interview Meet</Link>
                </div>

                <div className='hidden md:flex pr-4'>
                    <Link to="/" className='text-black mr-4 p-4'>Home</Link>
                    <Link to="/about" className='text-black mr-4 p-4'>About</Link>
                    <Link to="/rules" className='text-black mr-4 p-4'>Rules</Link>

                    {currentUser ?
                        <>
                            <div className='flex items-center justify-center mr-4'>
                                <img src={currentUser?.img} className='h-8 w-8 rounded-full object-cover cursor-pointer' alt='/' />
                            </div>
                            <Link 
                            to="/" 
                            className='text-white border bg-indigo-600 border-indigo-600 hover:bg-transparent hover:text-indigo-600 rounded-md px-8 py-1 flex items-center justify-center'
                            onClick={logout}
                            >Logout
                            </Link>
                        </>
                        : (
                            <>
                                <Link to="/register" className='text-black mr-4 p-4'>Register</Link>
                                <Link to="/login" className='text-white border bg-indigo-600 border-indigo-600 hover:bg-transparent hover:text-indigo-600 rounded-md px-8 py-1 flex items-center justify-center'>Login</Link>
                            </>
                        )}

                </div>

                <div className='md:hidden cursor-pointer' onClick={handleNav}>
                    {!nav ? <MdMenu size={30} /> : <IoClose size={30} />}
                </div>

            </div>

            <div className={nav ? " bg-zinc-200 flex flex-col w-full px-8" : 'hidden'}>
                <Link to="/" className='p-4 border-b-2 border-zinc-300 w-full'>Home</Link>
                <Link to="/about" className='p-4 border-b-2 border-zinc-300 w-full'>About</Link>
                <Link to="/rules" className='p-4 border-b-2 border-zinc-300 w-full'>Rules</Link>

                {currentUser ? (
                    <div className='my-4 flex flex-col'>
                        <Link to="/" className='text-white border bg-indigo-600 border-indigo-600 hover:bg-transparent hover:text-indigo-600 rounded-md px-8 py-3 text-center'>Logout</Link>
                    </div>
                ) : (
                    <div className='my-4 flex flex-col'>
                        <Link to="/register" className='bg-transparent border text-indigo-600 border-indigo-600 rounded-md px-8 py-3 mb-4 text-center'>Register</Link>
                        <Link to="/login" className='text-white border bg-indigo-600 border-indigo-600 hover:bg-transparent hover:text-indigo-600 rounded-md px-8 py-3 text-center'>Login</Link>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Navbar
