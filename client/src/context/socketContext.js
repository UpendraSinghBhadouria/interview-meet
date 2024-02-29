import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import AuthContext from "./authContext";

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const socketInstance = io(`${process.env.REACT_APP_API_URL}`);
        setSocket(socketInstance);
    }, [])

    useEffect(() => {
        console.log({ currentUser })
        socket?.emit('joinRoom', currentUser?.role);
    }, [socket, currentUser])

    useEffect(() => {
        socket?.on("getRoomInfo", ({ roomId, role }) => {
            setRoomId(roomId);
            console.log({ roomId, role })
        })

        return () => {
            socket?.disconnect();
        }
        // eslint-disable-next-line 
    }, [socket])

    useEffect(() => {
        if (!socket) return;

        socket.on('userDisconnected', (data) => {
            const { socketId } = data;

            console.log(`User with socket ID ${socketId} disconnected`);


        });

        return () => {
            socket.off('userDisconnected');
        };
    }, [socket]);
    return (
        <SocketContext.Provider value={{
            socket,
            setSocket,
            roomId,
            message,
            messageList,
            setMessage,
            setMessageList
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;