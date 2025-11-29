export const redisConfig  = {

    host : process.env.REDIS_HOST,
    port : Number(process.env.REDIS_PORT) ,
    userName : process.env.REDIS_USER_NAME,
    password : process.env.REDIS_PASSWORD

}