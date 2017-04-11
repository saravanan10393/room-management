import { Schema, SchemaTypes } from 'mongoose';

export default (mongoose) => {
    
    const userSchema = new mongoose.Schema({
        firstName : {type:String, required : true},
        lastName : {type:String, required : true},
        mobileNo : {type : String, required: true},
        email : {type: String, required: true},
        password : {type: String, required: true, default : '12345'},
        profileUrl : {type : String, default : null},
        room : {type: SchemaTypes.ObjectId, ref: "Room", default: null},
        isAdmin : {type: Boolean, default: false}
    });

    return userSchema;
};

