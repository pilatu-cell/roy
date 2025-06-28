import express from 'express'
import { Router } from 'express'
import {viewImages, viewVideos} from './sql.js'

const route= Router()
route.use(express.json())

route.get('/videos', async(req, res)=>{
        const video=await viewVideos() 
        const errorMessage='An error occured while fetching the video'
        JSON.stringify(video)
        console.log(video)
        if (video.success==='success') return res.status(200).json(video.view) 
        return res.status(404).json(errorMessage)
})
route.get('/images', async(req, res)=>{
        const images=await viewImages() 
        const errorMessage='An error occured while fetching the Images'
        JSON.stringify(images)
        if (images.success==='success') return res.status(200).json(images.view) 
        return res.status(404).json(errorMessage)
})

export default route