import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom';
import { storage } from '../firebase/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import axios from 'axios';
import AddAvatar from '../assets/addAvatar.png';
import { BiChevronDown } from 'react-icons/bi';

const roles = [
    { id: 1, name: 'Interviewer' },
    { id: 2, name: 'Applicant' }
]

const Register = () => {
    const [enteredValues, setEnteredValues] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        img: null
    })
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [file, setFile] = useState(null);
    const [perc, setPerc] = useState(0);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setEnteredValues((prev) => {
            return { ...prev, [event.target.name]: event.target.value };
        })
    }

    const handleFile = (event) => {
        setFile(event.target.files[0]);
    }

    const handleOpen = () => {
        setIsOpen((prev) => !prev);
    }

    const handleSelectedRole = (role) => {
        setSelectedRole(role);
        setEnteredValues((prev) => (
            { ...prev, role }
        ))
    }
    const uploadFile = () => {
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setPerc(progress);
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setEnteredValues((prev) => {
                        return { ...prev, img: downloadURL };
                    })
                });
            }
        );
    }

    useEffect(() => {
        file && uploadFile();
        // eslint-disable-next-line
    }, [file])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { name, email, password, img, role } = enteredValues;
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
                name, email, password, img, role
            });
            navigate("/login");
            console.log(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-screen h-screen bg-zinc-200'>
            <div className='h-[70px]'>
                <Navbar />
            </div>
            <div className='h-[calc(100vh-70px)] flex items-center justify-center'>
                <div className='bg-white py-5 px-[60px] rounded-[10px] flex flex-col items-center gap-[10px]'>

                    <span className='font-bold text-2xl text-indigo-500'>Register</span>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-[15px]'>
                        <input
                            type='text'
                            placeholder='Name'
                            className='p-3 outline-none w-72 border-b-2'
                            value={enteredValues.name}
                            name='name'
                            onChange={handleChange}
                        />
                        <input
                            type='email'
                            placeholder='Email'
                            className='p-3 outline-none w-72 border-b-2 placeholder:text-gray-400'
                            value={enteredValues.email}
                            name='email'
                            onChange={handleChange}
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            className='p-3 outline-none w-72 border-b-2 placeholder:text-gray-400'
                            value={enteredValues.password}
                            name='password'
                            onChange={handleChange}
                        />

                        <div className='w-72 border-b-2' onClick={handleOpen}>
                            <div className={`w-full p-3 flex items-center justify-between ${selectedRole ? 'text-black' : 'text-gray-400'}`}>
                                {selectedRole ? selectedRole : 'Role'}
                                <BiChevronDown
                                    size={20}
                                    className='text-gray-400'
                                />
                            </div>
                            <ul>
                                {isOpen && roles.map((role) => (
                                    <li
                                        key={role.id}
                                        onClick={() => handleSelectedRole(role.name)}
                                        className='p-3 text-sm hover:bg-indigo-600 hover:text-white'>{role.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <input
                            type='file'
                            id='file'
                            style={{ display: "none" }}
                            accept='image/*'
                            onChange={handleFile}
                        />
                        <label htmlFor='file' className='flex items-center gap-[10px] text-[12px] text-gray-400 cursor-pointer'>
                            <img width={32} src={AddAvatar} alt="" />
                            <span>Add an avatar</span>
                        </label>
                        <button className='bg-indigo-600 p-[10px] text-white font-bold border-none cursor-pointer disabled:cursor-not-allowed' disabled={perc > 0 && perc < 100}>Sign up</button>
                    </form>
                    <p className='text-[12px] text-black mt-[10px]'>You do have an account?
                        <Link to="/login"> Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
