import express from "express";
import { connectDB } from "./db/db";
import userRouter from "./routes/userRouter";
import cors from "cors";
import cookieParser from "cookie-parser";
import problemRouter from "./routes/problemRouter";
import fileRouter from "./routes/fileRouter";
import { Server } from "socket.io";
import { createServer } from "node:http";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/user/v1", userRouter);
app.use("/problemset/v1", problemRouter);
app.use("/file/v1", fileRouter);
// app.use("/socket/v1", socketRouter);

// all socket logic
const server = createServer(app); // creates a node server
const io = new Server(server); // this shit creates a separate websocket server whenever a connection opens

const username_to_socket: any = {};
const rooms: any = {};
const scores: any = {};
const contest: any = {};
const contestTime: any = {};

/**
 * {
 *  room1-1 : {
 *         Zaid: 100
 *          Anas : 200
 * },
 * room -2 : {
 *      Anas : 1000,
 *      Jack : 2000,
 * }
 * }
 *
 */

function getUsersInRoom(roomid: any) {
    if (rooms[roomid]) {
        return rooms[roomid];
    } else {
        return [];
    }
}

io.on("connection", (socket: any) => {
    socket.on("join-room", (payload: any) => {
        console.log("socket id on server side", socket.id);
        // console.log("entered room");
        socket.roomid = payload.roomid;
        socket.username = payload.username;

        socket.join(payload.roomid);
        username_to_socket[payload.username] = socket;

        if (!rooms[payload.roomid]) {
            rooms[payload.roomid] = [];
            scores[payload.roomid] = {};
            contest[payload.roomid] = false;
        }

        rooms[payload.roomid].push(payload.username);
        scores[payload.roomid][payload.username] = 0;

        // console.log(`${payload.username} joined ${payload.roomid}`);
        // console.log("debugged socket");
        // console.log(`the user socket id is: ${socket.id}`);
        const usersInRoom = getUsersInRoom(payload.roomid);
        // console.log("yayy");
        // console.log(socket.roomid);
        console.log("reached here");
        console.log("users in room", usersInRoom);
        console.log("socket room id", socket.roomid);
        io.to(payload.roomid).emit("allusers", { users: usersInRoom });
    });

    socket.on("get-users-in-room", (payload: any) => {
        const usersInRoom = getUsersInRoom(payload.roomid);
        socket.emit("allusers", { users: usersInRoom });
    });

    socket.on("update-score", (payload: any) => {
        scores[payload.roomid][payload.username] = payload.count;
    });

    socket.on("get-contest-score", (payload: any) => {
        socket.emit("contest-score", { contest_score: scores[payload.roomid] });
    });

    socket.on("close-contest", (payload: any) => {
        console.log("close-contest event fired");
        contest[payload.roomid] = true;
        // io.to(payload.roomid).emit("close-contest");
    });

    socket.on("get-close-contest", (payload: any) => {
        console.log("get-close-contest event fired");
        io.to(payload.roomid).emit("close-contest-value", {
            value: contest[payload.roomid],
        });
    });

    socket.on("store-time", (payload: any) => {
        if (!contestTime[payload.roomid])
            contestTime[payload.roomid] = payload.time;
        contestTime[payload.roomid] = Math.min(
            contestTime[payload.roomid],
            payload.time
        );
    });

    socket.on("get-store-time", (payload: any) => {
        io.to(payload.roomid).emit("time", {
            time: Math.max(0, contestTime[payload.roomid]),
        });
    });

    // socket.on("update-code", (payload: any) => {
    //     io.to(socket.roomid).emit("receive-code-update", {
    //         code: payload.code,
    //     });
    // });

    // socket.on("update-problem-statement", (payload:any) => {
    //     io.to(socket.roomid).emit("receive-problem-statement", {
    //         statement: payload.statement,
    //     });
    // });

    // socket.on("send-message", (payload:any) => {
    //     io.to(socket.roomid).emit("receive message", { msg: payload.msg });
    // });

    // socket.on("sending offer", (payload) => {
    //     // if a has already sent to b, then don't sent from b to a
    //     if (
    //         !pairExists(payload.userToSignal, payload.callerID) &&
    //         !pairExists(payload.callerID, payload.userToSignal)
    //     ) {
    //         addPair(payload.userToSignal, payload.callerID);
    //         console.log(
    //             `sending offer to ${payload.userToSignal} from ${payload.callerID}`
    //         );
    //         const targetSocket = username_to_socket[payload.userToSignal];
    //         // console.log(`target socket id is ${targetSocket.id}`);
    //         io.to(targetSocket.id).emit("offer received", {
    //             signal: payload.signal,
    //             callerID: payload.callerID,
    //         });
    //     }
    //     // io.to(socket.roomid).emit('receive message',{msg: payload.msg});
    // });

    // socket.on("sending reply", (payload) => {
    //     const targetSocket = username_to_socket[payload.callerID];
    //     console.log("sending reply");
    //     // console.log(`userid is: ${[payload.userid]}`);
    //     // console.log(`callerID is: ${[payload.callerID]}`);
    //     // console.log(`sending to: ${payload.callerID}`);
    //     if (targetSocket) {
    //         io.to(targetSocket.id).emit("reply received", {
    //             signal: payload.signal,
    //             id: payload.userid,
    //         });
    //     } else {
    //         console.log("cutie doesnt exist");
    //     }
    // });

    // socket.on("private message", (payload) => {
    //     const targetSocket = username_to_socket[payload.target];
    //     if (targetSocket) {
    //         targetSocket.emit("receive message", { msg: payload.msg });
    //     } else {
    //         console.log("you messed something up cutie");
    //     }
    // });

    // socket.on("get-users-in-room", (payload) => {
    //     const usersInRoom = getUsersInRoom(socket.roomid);
    //     console.log("someone is asking around");
    //     socket.emit("users-in-room", { users: usersInRoom });
    // });

    // socket.on("disconnect", () => {
    //     // this is trash bruh
    //     if (socket.roomid && rooms[socket.roomid]) {
    //         // Remove the user from the room when they disconnect.
    //         const index = rooms[socket.roomid].indexOf(socket.userid);

    //         if (index !== -1) {
    //             rooms[socket.roomid].splice(index, 1);
    //         }
    //         const usersInRoom = getUsersInRoom(socket.roomid);
    //         io.to(socket.roomid).emit("users-in-room", { users: usersInRoom });

    //         console.log("users currently in room are: " + usersInRoom);

    //         console.log(`${socket.userid} left ${socket.roomid}`);
    //     }
    //     removeuserfrompair();
    // });
});

server.listen(PORT, () => {
    try {
        console.log(`server listening on port ${PORT}`);
    } catch (err) {
        console.log("error in starting server", err);
    }
});
