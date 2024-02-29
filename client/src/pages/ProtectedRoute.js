import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/authContext';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser)
    if (!currentUser) {
        return <Navigate to="/login" />
    }
    return children;
}

export default ProtectedRoute
