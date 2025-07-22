import app from './app.js'
import dotenc from 'dotenv'
dotenc.config()

const PORT = process.env.PORT || 3000
import connectDB from './config/db.js'




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    connectDB()
})