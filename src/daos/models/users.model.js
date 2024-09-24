
import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const usersSchema = new Schema({
    
        firts_name: {
        type: String,
        index: true
    },
    last_name: String,
    age: Number,
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: String,
    role:{
        type:String,
        default: 'user'
    },
    cart:{
        type: Schema.Types.ObjectId,
        ref: 'carts'
    },
    documents: [
        {
          name: String,
          reference: String,
        }
    ],    
    last_connection: {
        type: Date,
        default: Date.now,
    }
})

usersSchema.plugin(mongoosePaginate)

usersSchema.pre('find', function() {
    this.populate('cart')
  })

const usersModel = model('users', usersSchema)

export default usersModel;
