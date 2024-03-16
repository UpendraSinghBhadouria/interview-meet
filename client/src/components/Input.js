import React, { useContext, useState } from 'react'
import AuthContext from '../context/authContext';
import SocketContext from '../context/socketContext';
import { IoImageOutline, IoSend } from 'react-icons/io5';

const Input = ({socket}) => {
    const [enteredMessage, setEnteredMessage] = useState('');
    const { currentUser } = useContext(AuthContext);
    const { setMessageList, setMessage, roomId } = useContext(SocketContext);

    const inputChangeHandler = (event) => {
        setEnteredMessage(event.target.value);
    }

    const sendMessaage = async (event) => {
        event.preventDefault();
        const messageData = {
            room: roomId,
            username: currentUser.name,
            userImg: currentUser.img,
            message: enteredMessage
        }

        await socket.emit("send_message", messageData);
        setMessageList((prev) => [...prev, messageData]);
        setMessage(enteredMessage);
        setEnteredMessage('');
    }

    return (
        <div className="p-4">
            <form
                className="flex items-center p-2 bg-white rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.1)]"
                onSubmit={sendMessaage}
            >
                <button className="p-2 rounded-lg hover:bg-gray-200">
                    <IoImageOutline size={24} />
                </button>
                <input
                    type="text"
                    className="w-full border-none outline-none py-3 px-4 pl-2"
                    value={enteredMessage}
                    onChange={inputChangeHandler}
                />
                <button
                    type="submit"
                    className="py-3 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                    <IoSend size={24} />
                </button>
            </form>
        </div>
    )
}

export default Input
