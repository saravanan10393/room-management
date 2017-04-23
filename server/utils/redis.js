import { createClient } from "redis"
//let bluebrid = require('bluebird');
import { promisifyAll } from "bluebird"
import config from "../app.config";

const redisClient = createClient({
    host : config.REDIS_SERVER,
    port : config.REDIS_PORT
});

redisClient.on("connect", (err,data) => {
    console.log("redis is connected ",err, data);
});

redisClient.on("error", (err, data) => {
    console.log("redis connection error ", err, data)
});

promisifyAll(redisClient.prototype || redisClient.__proto__);

const memcache = {};

memcache.set = async (key, value="", exp=86400) => {
    try{
        await redisClient.setexAsync(key, exp, value);
        console.log(memcache.get(key));
    }catch(error){
        console.error("Failed to set in  key ", key, "and error ", error)
        throw error
    }
}

memcache.get = (key) => {
   return redisClient.getAsync(key);
};

export default memcache;