import { Schema, model } from 'mongoose';

const messagesSchema = new Schema({
    user: String,
    message: String
})

const messagessModel = model('messages', messagesSchema)

export default messagessModel;


