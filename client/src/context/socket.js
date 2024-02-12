import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setRoomId } from "../redux/features/roomSlice";

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);

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
            dispatch(setRoomId(roomId));
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
        <SocketContext.Provider value={{ socket, setSocket }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;