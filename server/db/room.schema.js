import { Schema, SchemaTypes } from 'mongoose';
export default (mongoose) => {
    const roomSchema = new mongoose.Schema({
        address: {
        flatNo : {type: String, required: true},
        street : {type: String, required: true},
        city : {type: String, required: true},
        state : {type: String, required: true},
        pin: {type: String, required: true}
        },
        members : [{type:SchemaTypes.ObjectId, ref:'User'}] ,
        expences : [{type:SchemaTypes.ObjectId, ref:'Expence'}]
    });

    return roomSchema;
}