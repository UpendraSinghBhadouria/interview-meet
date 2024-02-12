import React, { } from 'react'
import './Message.scss';
import { useSelector } from 'react-redux';

const Message = ({ messageContent }) => {

    const { currentUser } = useSelector(state => state.user);

    return (
        <div className={`message ${currentUser?.name === messageContent?.username && 'owner'}`}>
            <div className="messageInfo">
                <img
                    src={currentUser?.name === messageContent?.username ?
                        currentUser?.img : messageContent?.userImg
                    }
                    className='img'
                    height={40}
                    width={40}
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