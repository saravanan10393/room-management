import { Schema, SchemaTypes} from 'mongoose';

/**
 * Types can be {default, sole, shared}
 *      defaults are rooms fixed routine expences like rent, net bill etc..
 * Mode can be {cash, card}
 */
export default (mongoose) => {
    const expenceSchema = new mongoose.Schema({
        type : {type : String, default : 'sole'},
        user : {type:SchemaTypes.ObjectId, ref:'User'},
        room : {type:SchemaTypes.ObjectId, ref:'Room'} ,
        amount : {type: Number, required : true},
        mode : {type : String , default : 'Cash'},
        sharedWidth : [
            {
                user : {type : SchemaTypes.ObjectId, required : true},
                amount : {type : Number, required : true},
            }
        ]
    });

   return expenceSchema;
}