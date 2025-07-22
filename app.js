import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
const app = express()

import meetingRoutes from './routes/meetingRoutes.js'
import authRoutes from './routes/authRoutes.js'

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
}))
app.use(morgan("dev"))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use("/api/auth", authRoutes)
app.use("/api/meetings", meetingRoutes)


export default app