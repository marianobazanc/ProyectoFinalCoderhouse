import { Schema, model } from 'mongoose';

const TicketSchema = new Schema({
  code: String,
  purchase_datetime: { 
    type: Date, 
    required: true, 
    default: Date.now 
   },
  amount: Number, 
  user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
  },
  products: {
    type: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: Number
    }]
}
})

TicketSchema.pre('find', function() {
  this.populate('products.product')
})

TicketSchema.pre('findOne', function() {
  this.populate('products.product')
})


const ticketModel = model('tickets', TicketSchema)

export default ticketModel;