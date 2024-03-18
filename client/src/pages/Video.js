import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import usePeer from '../hooks/usePeer';
import useMediaStream from '../hooks/useMediaStream';
import usePlayer from '../hooks/usePlayer';
import SocketContext from '../context/socketContext';
import Player from '../components/Player';
import { FcEndCall } from "react-icons/fc";
import Message from '../components/Message';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';

const Video = () => {
  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();
  const { players, setPlayers } = usePlayer();

  const { socket, messageList, setMessageList } = useContext(SocketContext);
  const chatContainerRef = useRef(null);
  const [toggleMessages, setToggleMessages] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to the bottom of the chat container when chatList changes
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messageList]);

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
      setMessageList((prev) => [...prev, data]);
    })
    // eslint-disable-next-line
  }, [socket])
  console.log({ messageList })

  const handleToggleMessages = () => setToggleMessages((prev) => !prev);

  const handleEndCall = () => {
    socket.disconnect();
    navigate("/");

    setTimeout(() => {
      window.location.reload();
      console.log("done.")
    }, 1000);
  }
  
  return (
    <div className='h-screen w-screen'>
      <div className='h-[70px]'>
        <Navbar />
      </div>
      <div className="h-[calc(100vh-70px)] flex justify-center items-center bg-white">
        <div className='flex-[2] h-full flex justify-center items-center flex-col gap-3'>
          <div className='flex sm:gap-3 flex-col sm:flex-row'>
            {Object.keys(players).map((playerId) => {
              const { url, muted, playing } = players[playerId];
              return (
                <Player
                  key={playerId}
                  url={url}
                  muted={muted}
                  playing={playing}
                />
              )
            })}
          </div>
          <div className='flex gap-3'>
            <span
              onClick={handleEndCall}
              className='flex justify-center items-center text-2xl text-red-500 font-bold gap-2 bg-gray-100 p-2 cursor-pointer rounded-md'>
              End Call
              <FcEndCall size={30} />
            </span>
            <span
              onClick={handleToggleMessages}
              className='text-xl sm:text-2xl text-gray-800 font-bold gap-2 bg-gray-100 p-2 cursor-pointer rounded-md'
            >
              {toggleMessages ? 'Hide' : 'Show'} Messages
            </span>
          </div>
        </div>

        {toggleMessages && <div className='flex-[1] h-full'>
          <div className='h-full w-full flex flex-col bg-gray-100 border rounded-xl'>

            {/* chatHeader */}
            <div className="p-4">
              <h2 className="text-2xl font-semibold"> View Messages </h2>
            </div>
            {/* chatMain */}
            <div className="h-full p-4 overflow-y-auto" ref={chatContainerRef}>
              <div className="h-full flex flex-col">
                {messageList?.map((message) => {
                  return <Message messageContent={message} key={Math.random()} />
                })}
              </div>
            </div>
            {/* chatFooter */}
            <Input socket={socket} />

          </div>
        </div>}

      </div>
    </div>
  )
}

export default Video
