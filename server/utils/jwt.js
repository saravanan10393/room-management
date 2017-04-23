import { sign, verify } from "jsonwebtoken";

import config from '../app.config';

const jwt = {};

jwt.encode = (data, exp=600) => {
    return sign({mobileNo: data}, config.JWT_SECRET, {expiresIn: exp})
}

jwt.verify = (token) => {
    try{
        return verify(token, config.JWT_SECRET)
    }catch(err){
        console.error(err)
        throw err;
    }
}

jwt.setUserToken = (data, key=null) => {
    //Token compromise logic should go here
    try{
        let accessToken = jwt.encode(data, "1d");
        // let key = data.mobileNo || key;
        // let refreshToken = await memcache.get(key)
        // if(refreshToken){
        //     jwt.verify(refreshToken);
        // }else{
        //    refreshToken = jwt.encode(data, "1d")
        //    memcache.set(key, refreshToken) 
        // }
        // memcache.set(refreshToken, accessToken);
        return accessToken;
    }catch(err){
        if(err.name == "TokenExpiredError"){
            throw {error: true, message: "Refresh token exipired. Required login"}
        }
    }
}

export default jwt;
