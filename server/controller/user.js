import { User } from '../model/user';

class UserController{

    async create(req, res){
        let userObj = new User({mobileNo:req.body.mobileNo});
        userObj.setUserId(req.body.mobileNo);
        try{
            let userIns = await userObj.getIfExist()
            if(userIns){
                throw { error : true, message : "User Already exist"};
            }
            newUser = await userObj.createUser(req.body)
            res.status(200).json(newUser)
        }catch(error){
            console.log('catching error ',error);
            res.status(400).send(error);
        }
    }

    signin(req, res){
        res.json({key : "it works"})
    }

    forgotPassword(req, res){

    }
}

export default new UserController();