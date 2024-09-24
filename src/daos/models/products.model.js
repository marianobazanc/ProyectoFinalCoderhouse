import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const productsSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: {
        type: String
    },
    stock: Number,
    status: Boolean,
    category: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})
productsSchema.plugin(mongoosePaginate)

productsSchema.pre('findById', function() {
    this.populate('owner.users')
  })

  
 productsSchema.pre('find', function() {
    this.populate('owner.users')
  })
  

const productsModel = model('products', productsSchema)

export default productsModel;
