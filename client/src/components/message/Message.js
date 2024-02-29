import React, { useContext } from 'react'
import './Message.scss';
import AuthContext from '../../context/authContext';

const Message = ({ messageContent }) => {

    const { currentUser } = useContext(AuthContext);

    return (
        <div className={`message ${currentUser?.name === messageContent?.username && 'owner'}`}>
            <div className="messageInfo">
                <img
                    src={currentUser?.name === messageContent?.username ?
                        currentUser?.img : messageContent?.userImg
                    }
                    className='img'
                    alt=''
                />
                <p>{messageContent?.username}</p>
            </div>
            <div className="messageContent">
                <p>{messageContent?.message}</p>
                {/* <Image
                    className='img'
                    src={AvatarImg}
                    alt=''
                /> */}
            </div>
        </div>
    )
}

export default Message;