import redis from 'redis'

export const client = redis.createClient({
    url: 'redis://127.0.0.1:6379'
})

client.on('error', (err)=>{
    return {error:`An error ${err.message} occured`}
})

redisConnect()

async function redisConnect() {
    try {
        await client.connect()
        console.log('redis connected')
        return {message: 'Redis client connected successfully'};
    } catch (error) {
        console.log('Redis connection error:', error);
        return {error: `Redis connection failed: ${error.message}`};
    }
}