import { UserModel } from '../db/db';
import { reject as Reject } from 'promise';

export class User {

    static getInstance(){
        return new User();
    }
   
    setUserId(mobileNo){
        this.mobileNo = mobileNo
    }

    /**
     * 
     * @param {user schema object} userData 
     * 
     */
    extendUser(userData){
        let userObj = new User();
        Object.defineProperty(userObj, "document", {
            value : userData,
            enumerable : false
        });
        return Object.assign(userObj, userData.toObject());
    }

    getIfExist(){
        return UserModel.findOne({mobileNo : this.mobileNo}, "-password -__v")
        .exec()
        .then( 
               (data) => {
                   console.log('success of findone')
                   if(!data) return;
                   return this.extendUser(data);
               }, 
               (err) => {console.log('error of findone',  err); return err}
        )
    };

    checkCredential(password){
        return UserModel.findOne({mobileNo : this.mobileNo, password : password}, "-password -__v")
        .exec()
        .then( 
               (data) => {
                   console.log('success of findone')
                   if(!data) return;
                   return this.extendUser(data);
               }, 
               (err) => {console.log('error in check credential',  err); return err}
        )
    }

    /**
     * 
     * @param {user schema required fields} userData 
     */
    createUser(userData){
        console.log('create user caled', userData)
        let userObj = new UserModel(userData)
        return userObj.save().then(
            data => this.extendUser(data), 
            err => err
        );
    };

    /**
     * 
     * @param {partial or whole user schema properties to update} data 
     */
    update(data){
        UserModel.findOneAndUpdate({mobileNo : this.mobileNo}, data)
            .exec()
            .then(
                data => this.extendUser(data), 
                err => err
            )
    }

    delete(){
        return UserModel.remove({id : this.id}).exec();
    }
}