import { useContext, useEffect, useState } from "react";
import SocketContext from "../context/socketContext";

const usePeer = () => {
    const { socket, roomId } = useContext(SocketContext);

    const [peer, setPeer] = useState();
    const [myId, setMyId] = useState();

    console.log({ roomId })
    useEffect(() => {
        (async function initPeer() {
            const myPeer = new (await import('peerjs')).default();
            setPeer(myPeer);

            myPeer.on('open', (id) => {
                console.log(`Your peer id is ${id}`)
                setMyId(id);

                socket?.emit("joinVideoRoom", { roomId, id })
            })
        })()
        // eslint-disable-next-line
    }, [])

    return { peer, myId }
}

export default usePeer;