import jwt from '../utils/jwt';
import User from "../model/user";

export function authenticate(req, res, next){
    //need to do authenticaiton
    try{
        let mobileNo = jwt.verify(req.get('Access-Token')).mobileNo;
        let userIns = new User();
        userIns.setMobileNo(mobileNo);
        // all authenticated request will have userIns for further usage
        req.userIns = userIns;
        next();
    }catch(err){
        console.log(err)
        res.status(403).send({error:true, message: "Invalid Access-Token"});
    }
};

export function checkRole (role) {
    return (req, res, next) => {
        if(req.query.role == role){
            console.log('role accessing works');
            next();            
        }else{
            res.status(403);
            next(new Error("access denied"))
        }
    };
};