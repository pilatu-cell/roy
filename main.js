import dotenv from 'dotenv'
import 'dotenv/config'
import express from 'express'
import upload from './routes/upload.js'
import views from './routes/viewUpload.js'

const app=express()
const PORT= process.env.MY_PORT
app.use(express.json())
app.use('/viewuploads', views)
app.use('/upload', upload)

app.listen(PORT, 
    console.log(`MR.KRABS I WANNA GO TO SLEEP!!! ${PORT}`)
)