import React, { useContext } from 'react'
import AuthContext from '../context/authContext'

const Message = ({ messageContent }) => {

    const { currentUser } = useContext(AuthContext);

    return (
        <div className={`flex 
        ${currentUser?.name === messageContent?.username ? "justify-end" : "justify-start"} 
        ${currentUser?.name === messageContent?.username ? "mt-4" : "mt-2"} first:mt-auto`} >
            <div className={`text-sm px-4 py-2 
            ${currentUser?.name === messageContent?.username ? "bg-gray-200" : "bg-white"} rounded-lg`}>
                <div> {messageContent?.message} </div>
            </div>
        </div>
    )
}

export default Message
