import React, { useContext, useState } from 'react'
import './Input.scss';
import AttachImg from '../../assets/attach.png';
import Img from '../../assets/img.png';
import AuthContext from '../../context/authContext';
import SocketContext from '../../context/socketContext';

const Input = ({ socket }) => {
    const [enteredMessage, setEnteredMessage] = useState('');
    const { currentUser } = useContext(AuthContext);
    const { setMessageList, setMessage, roomId } = useContext(SocketContext);

    const inputChangeHandler = (event) => {
        setEnteredMessage(event.target.value);
    }

    const sendMessaage = async () => {
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

    const onKeyDownHandler = (event) => {
        if (event.key === "Enter") {
            sendMessaage();
        }
    }
    return (
        <div className='input'>
            <button>Next</button>
            <input
                type="text"
                placeholder='Type something..'
                value={enteredMessage}
                onChange={inputChangeHandler}
                onKeyDown={onKeyDownHandler}
            />
            <div className="send">
                <img src={AttachImg} className='img' height={24} alt='' />
                <input type="file" id="file" style={{ display: "none" }} />
                <label htmlFor="file">
                    <img src={Img} className='img' height={24} alt='' />
                </label>
                <button onClick={sendMessaage}>Send</button>
            </div>
        </div>
    )
}

export default Input
