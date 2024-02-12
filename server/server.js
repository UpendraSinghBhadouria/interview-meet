import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connect from "./utils/database.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// middlewares
app.use(cookieParser());
app.use(cors({
    origin: 'https://interview-meet.vercel.app',
    credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json("Server is running")
})
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// error handling
app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMessage = err.message || "Something went wrong!";
    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage,
    })
})


// sockets 
const rooms = {};

io.on("connection", (socket) => {
    console.log(`user is connected with id: ${socket.id}`);

    socket.on('joinRoom', (role) => {
        if (role !== 'Applicant' && role !== 'Interviewer') {
            // Handle invalid role, emit an error, or take appropriate action
            socket.emit('invalidRole', role);
            return;
        }

        let roomFound = false;

        // Iterate through existing rooms
        Object.keys(rooms).forEach((roomId) => {
            const occupants = rooms[roomId];

            // Check if the room has one occupant and the occupant has a different role
            if (occupants.length === 1 && occupants[0].role !== role && !roomFound) {
                // Room has one occupant with a different role; add user to the room
                socket.join(roomId);
                rooms[roomId].push({ socketId: socket.id, role });
                roomFound = true;

                // Emit event to inform the client about the room ID and role
                socket.emit('getRoomInfo', { roomId, role });
            }
        });

        // If no available rooms, create a new one
        if (!roomFound) {
            const newRoomId = generateRoomId();
            socket.join(newRoomId);
            rooms[newRoomId] = [{ socketId: socket.id, role }];

            // Emit event to inform the client about the new room ID and role
            socket.emit('getRoomInfo', { roomId: newRoomId, role });
        }

        // Log rooms (for debugging purposes)
        console.log(rooms);
    });


    socket.on("send_message", (data) => {
        // socket.to(data.room).emit("receive_message", data)
        // console.log(data)
        if (rooms[data.room]) {
            socket.to(data.room).emit("receive_message", data);
            console.log(data);
        } else {
            // Handle invalid room error
            console.error(`Invalid room: ${data.room}`);
        }
    })

    socket.on('disconnect', () => {
        Object.keys(rooms).forEach((roomId) => {
            const occupants = rooms[roomId];

            const index = occupants.findIndex(occupant => occupant.socketId === socket.id);

            if (index !== -1) {
                occupants.splice(index, 1);

                // If the room is now empty, delete the room
                if (occupants.length === 0) {
                    delete rooms[roomId];
                } else {
                    io.to(roomId).emit('userDisconnected', { socketId: socket.id });
                    console.log("del", rooms[roomId])
                    // Iterate through existing rooms
                    let delRoomId = roomId;
                    const delItem = rooms[roomId];
                    const { socketId, role } = delItem[0];
                    console.log({ socketId, role })

                    Object.keys(rooms).forEach((roomId) => {
                        const occupants = rooms[roomId];

                        // Check if the room has one occupant and the occupant has a different role
                        if (occupants.length === 1 && occupants[0].role !== role) {
                            // Room has one occupant with a different role; add user to the room
                            socket.join(roomId);
                            rooms[roomId].push({ socketId, role });
                            delete rooms[delRoomId];
                            console.log("dis", rooms[roomId])
                            // Emit event to inform the client about the room ID and role
                            // socket.emit('getRoomInfo', { roomId, role });
                            io.to(socketId).emit('getRoomInfo', { roomId, role });
                            return;
                        }
                    });
                }
                console.log(rooms);
            }
        })
    })

    socket.on("joinVideoRoom", ({ roomId, id }) => {
        console.log(`A new user ${id} joined the room ${roomId}`)
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("userConnected", id)
    })
    function generateRoomId() {
        // Implement a proper room ID generation logic
        return Math.random().toString(36).substring(7);
    }
})



server.listen(PORT, () => {
    connect();
    console.log(`Server is listening at http://localhost:${PORT}`);
})