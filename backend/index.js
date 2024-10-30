import express from "express";
import dotenv from "dotenv"; // import environment variable
import cors from  'cors';
import cookieParser from 'cookie-parser'

import { connectDB } from "./db/connectDB.js"; // import database

import authRoutes from "./routes/auth.route.js"; // import router
import router from "./Router/dataRoutes.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({origin: "http://localhost:5173", credentials: true}));

app.use(express.json())// allows us to parse incoming requests with JSON payloads
app.use(cookieParser()); // allow us to parse incoming cookies
// router
app.use('/api/auth', authRoutes); // signin, login , logout router are there.
app.use('/api', router);

app.listen(PORT, ()=>{
    connectDB();
    console.log("server is running on port: ", PORT);
})

//UExl7Nx9W7lCnZDO
//mongodb+srv://ibera866:UExl7Nx9W7lCnZDO@cluster0.bwnj1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0