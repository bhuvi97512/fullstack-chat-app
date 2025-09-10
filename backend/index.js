
 import express from "express";
 import dotenv from "dotenv";
 import cookieParser from "cookie-parser";
 import cors from "cors";

 import path from "path";

import {connectDB} from "./src/lib/db.js"

import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js";
import {  app, server } from "./src/lib/socket.js"

dotenv.config();


const PORT = process.env.PORT;
const __dirname = path.resolve();
console.log("Current Directory: ", __dirname);
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.get("/", (req, res) => {
    res.send("API is running....");
}   )
// if(process.env.NODE_ENV === "production") {
//     console.log("Environment: ", process.env.NODE_ENV);

//     app.use(express.static(path.join(__dirname, "../Frontend/dist")));
// }

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"),function(err) {
//         if(err) {
//             res.status(500).send(err)
//         };
// })
// })



server.listen(PORT, () => {
    console.log("Server is running on PORT:" + PORT);
    connectDB();
})
export {app, server};