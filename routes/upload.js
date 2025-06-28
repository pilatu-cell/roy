
import express from 'express'
import { Router } from 'express'
import multer from 'multer'
import {uploadVideo, uploadImage} from './sql.js'

const route=Router()
route.use(express.json())

const storage=multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, './assets')
    },
    filename:(req, file, cb)=>{
        cb(null, `${Date.now()}__${file.originalname}`)
    }
})

const upload=multer({storage})

route.post('/video', upload.single('video'), async(req, res)=>{
        const filePath=req.file.path
        console.log(filePath)
        try {
            const video= await uploadVideo(filePath)
            const message= 'Video saved successfully'
            const error='An error occured while saving the video. Try again later'
            if (video==='success') return res.status(201).json(message)
            console.log(video)
            return res.status(400).json(error)
        } catch (error) {
            console.log(error)
            const errorMessage='Server error'
            return res.status(500).json(errorMessage)
        }
})
route.post('/image', upload.single('image'), async(req, res)=>{
        const filepath=req.file.path

        try {
            const image= await uploadImage(filepath)
            const success= 'Image saved successfully'
            const error='An error occured while saving the image' 
            console.log(image)

            if(image==='success') return res.status(201).json(success) 
            return res.status(201).json(error)

        } catch (error) {
            console.log(error)
            errorMessage='Server error'
            return res.status(500).json(errorMessage)
        }
})

export default route