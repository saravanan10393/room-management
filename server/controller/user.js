import { User } from '../model/user';
import memcache from "../utils/redis";
import { verifyMobileNo } from "../utils/utils";
import jwt from "../utils/jwt";

class UserController{

    async create(req, res){
        let userObj = User.getInstance();
        userObj.setUserId(req.body.mobileNo);
        try{
            let userIns = await userObj.getIfExist();
            if(userIns){
                throw { error : true, message : "User Already exist"};
            }
            userIns = await userObj.createUser(req.body);
            let token = jwt.encode(userIns.mobileNo);
            res.header('Access-Token', token).status(200).json(userIns);
        }catch(error){
            console.log('catching error ',error);
            res.status(400).send(error);
        }
    }

    async signin(req, res){
        try {
            if(!req.body.mobileNo || !req.body.mobileNo){
                throw { error: true, message: "Invalid Username or password" };    
            }
            let userObj = User.getInstance();
            userObj.setUserId(req.body.mobileNo);
            userObj = await userObj.checkCredential(req.body.password);
            if (!userObj) {
                throw { error: true, message: "Invalid Username or password" };
            }
            let token = jwt.encode(userObj.mobileNo);
            res.header('Access-Token', token).status(200).json(userObj);
        } catch (error) {
            console.log('catching error ', error);
            res.status(400).send(error);
        }
    }

    async forgotPassword(req, res){
        // Todo send forgot password OTP code
        try{
            if(!req.body.mobileNo || !verifyMobileNo(req.body.mobileNo)){
                throw {error: true, message: "Invalid MobileNo"};
            }
            let userIns = new User()
            userIns.setUserId(req.body.mobileNo);
            userIns =  await userIns.getIfExist()
            if(!userIns){
                throw {error: true, message: "You aren't registered with us"};
            }
            //generate otp
            let otp = "12345"
            memcache.set("FP:"+req.body.mobileNo, otp, 300);
            res.send({message: "otp has been send to mobileNo"});
        }catch(err){
            console.error(err)
            res.status(400).send(err);
        }
    }

    async verifyOTP(req, res){
        try{
            if(!req.body.otp){
                throw {error: true, message: "OTP Required"}
            }
            let savedToken = await memcache.get("FP:"+req.body.mobileNo);
            if(!savedToken || savedToken != req.body.otp){
                throw {error: true,message :"OTP doesn't match"}
            }
            memcache.set("FPV:"+req.body.mobileNo, "true", 300);
            res.send({message: "OTP Verified"});
        }catch(err){
            console.error(err)
            res.status(400).send(err);
        }
    }

    async resetPassword(req, res){
        // need to take user id from redis
        if(!req.body.password || req.body.password != req.body.confirmPassword){
            res.send({error : true, message : "Password doesnot match"});
            return;
        }
        try{
            let isOtpVerified = await memcache.get("FPV:"+req.body.mobileNo);
            if(!isOtpVerified) throw {error:true, message: "OTP is not verified"}
            let userObj = User.getInstance();
            userObj.setUserId(req.body.mobileNo);
            await userObj.update({password : req.body.password})
            res.send({message : "Password changed"});
        }catch(err){
            console.error(err)
            res.status(400).send(err)
        }
    }

    async update(req, res){
      try{
        await req.userIns.update(req.body)  
      }catch(err){
           res.status(400).send(err)
      }
    }

    async delete(req, res){
        try{
            let userObj = new User();
            userObj.setUserId(req.params.id);
            await userObj.delete();
            res.status(200).json({ message : "User deleted "});
        }catch(err){
            console.log('catching error ',error);
            res.status(400).send(error);
        }
    }
}

export default new UserController();