import React, { useContext, useEffect } from "react";
import "./Video.scss";
import Player from "../../components/player/Player";
import Input from "../../components/input/Input";
import { useDispatch, useSelector } from "react-redux";
import usePeer from "../../hooks/usePeer";
import useMediaStream from "../../hooks/useMediaStream";
import usePlayer from "../../hooks/usePlayer";
import SocketContext from "../../context/socket";
import { setMessageList } from "../../redux/features/roomSlice";
import Message from "../../components/message/Message";
import Navbar from "../../components/Navbar";

const Video = () => {
    const { messageList } = useSelector(state => state.room);
    const { peer, myId } = usePeer();
    const { stream } = useMediaStream();
    const { players, setPlayers } = usePlayer();
    const { socket } = useContext(SocketContext);

    const dispatch = useDispatch();

    useEffect(() => {
        const handleUserConnected = (newUser) => {
            console.log(`user connected in room with ${newUser}`);

            const call = peer?.call(newUser, stream);
            call?.on('stream', (incommingStream) => {
                console.log(`Incomming stream from ${newUser}`);

                setPlayers((prev) => {
                    return {
                        ...prev,
                        [newUser]: {
                            url: incommingStream,
                            muted: true,
                            playing: true
                        }
                    }
                })
            })
        }

        socket?.on('userConnected', handleUserConnected);

        return () => {
            socket?.off('userConnected', handleUserConnected);
        }

    }, [peer, socket, stream, setPlayers])

    useEffect(() => {
        peer?.on('call', (call) => {
            const { peer: callerId } = call;

            call?.answer(stream);

            call?.on('stream', (incommingStream) => {
                console.log(`Incomming stream from ${callerId}`);

                setPlayers((prev) => {
                    return {
                        ...prev,
                        [callerId]: {
                            url: incommingStream,
                            muted: true,
                            playing: true
                        }
                    }
                })
            })
        })
    }, [peer, stream, setPlayers])

    useEffect(() => {
        if (!stream || !myId) return;
        console.log(`setting my stream ${myId}`);
        setPlayers((prev) => {
            return {
                ...prev,
                [myId]: {
                    url: stream,
                    muted: true,
                    playing: true
                }
            }
        })
    }, [myId, stream, setPlayers])

    useEffect(() => {
        socket?.on("receive_message", (data) => {
            dispatch(setMessageList(data));
        })
        // eslint-disable-next-line
    }, [socket])

    return (
        <div className='video'>
            <Navbar />
            <div className="container">
                <div className="left">
                    <div className="videos">
                        {Object.keys(players).map((playerId) => {
                            const { url, muted, playing } = players[playerId];
                            return (
                                <div className="user_video" key={playerId}>
                                    <Player
                                        url={url}
                                        muted={muted}
                                        playing={playing}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="right">
                    <div className="chats">Chats</div>
                    <div className="messages">
                        {messageList?.map((message) => {
                            return <Message messageContent={message} key={Math.random()} />
                        })}
                    </div>
                    <Input
                        socket={socket}
                    />
                </div>
            </div>
        </div>
    )
}

export default Video
