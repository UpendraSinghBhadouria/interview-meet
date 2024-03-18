import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AuthContext from '../context/authContext';

const Login = () => {
    const [enteredValues, setEnteredValues] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleChange = (event) => {
        setEnteredValues((prev) => {
            return { ...prev, [event.target.name]: event.target.value };
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(enteredValues);
            navigate("/");
        } catch (err) {
            console.log(err.response.data.message);
            setError(err.response.data.message);
        }
    }

    return (
        <div className='w-screen h-screen bg-zinc-200'>
            <div className='h-[70px]'>
                <Navbar />
            </div>
            <div className='h-[calc(100vh-70px)] flex justify-center items-center'>
                <div className='bg-white py-5 px-[60px] rounded-[10px] flex flex-col items-center gap-[10px]'>
                    <span className='font-bold text-2xl text-indigo-500'>Login</span>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-[15px]'>
                        <input
                            type='email'
                            placeholder='Email'
                            className='p-[15px] w-[290px] outline-none border-b-2 placeholder:text-gray-400'
                            value={enteredValues.email}
                            onChange={handleChange}
                            name='email'
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            className='p-[15px] w-[290px] outline-none border-b-2 placeholder:text-gray-400'
                            value={enteredValues.password}
                            onChange={handleChange}
                            name='password'
                        />
                        {error && <span className='text-red-500 font-light'>{error}</span>}
                        <button className='text-white bg-indigo-600 p-[10px] font-bold border-none cursor-pointer'>Login</button>
                    </form>

                    <p className='text-[12px] mt-3 text-black'>{"You don't have an account?"}
                        <Link to="/register"> Register</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;
