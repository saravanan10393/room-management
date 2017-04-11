import { Mongoose } from 'mongoose';
import Promise from "promise";

let mongoose = new Mongoose();

import ExpenceSchema from './expences.schema';
import RoomSchema from './room.schema';
import UserSchema from './user.schema';

import { DB_URL } from '../utils/constant'

mongoose.connect(DB_URL);

mongoose.Promise = Promise;


export const  ExpenceModel = mongoose.model.bind(mongoose)('Expence',ExpenceSchema(mongoose)),
  RoomModel = mongoose.model.bind(mongoose)('Room',RoomSchema(mongoose)),
  UserModel = mongoose.model.bind(mongoose)('User', UserSchema(mongoose));


