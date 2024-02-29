import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    )
    console.log(currentUser)
    const login = async (enteredValues) => {
        const { email, password } = enteredValues;
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
            email, password
        }, {
            withCredentials: true
        });
        setCurrentUser(res.data);
        console.log(res.data);
    }

    const logout = () =>{
        setCurrentUser(null);
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login,  logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;