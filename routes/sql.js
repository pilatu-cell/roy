import 'dotenv/config'
import sql from 'mysql2'


const db =sql.createPool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DB,
}).promise()
export async function uploadVideo(videoPath) {
    const [upload]= await db.query('INSERT INTO videos (videopath) VALUES(?)', [videoPath])
    const success='success'
    if(upload) return success
    return {error:'failed to upload'}
}
export async function uploadImage(imagePath) {
    const [upload]=await db.query('INSERT INTO images (imagepath) VALUES(?)', [imagePath])
    const success='success'
    if(upload) return success
    return {error:'failed to upload'}
}

export async function viewVideos() {
    const [view]= await db.query('SELECT *FROM videos')
    const success='success'
    const error='No video found'
    if (view.length>0) return {success, view}
    return error
}

export async function viewImages() {
    const [view]= await db.query('SELECT *FROM images')
    const success='success'
    const error='No video found'
    if (view.length>0) return {success, view}
    return error
}
 