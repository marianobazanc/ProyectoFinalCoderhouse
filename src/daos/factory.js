import { configObject } from '../config/config.js';

const {persistence}= configObject

export let ProductDao
export let UserDao
export let CartDao
export let TicketDao

switch (persistence)
{
    case 'MONGO':
        const { default: ProductDaoMongo }  =await import ('./mongo/productManagerMongoose.js')
        ProductDao= ProductDaoMongo

        const { default: UsertDaoMongo } = await import ('./mongo/userManagerMongoose.js')
        UserDao= UsertDaoMongo

        const { default: CartDaoMongo }  = await import ('./mongo/cartsManagerMongoose.js')
        CartDao= CartDaoMongo

        const { default: TicketDaoMongo }  = await import ('./mongo/ticketManagerMongoose.js')
        TicketDao= TicketDaoMongo
        break;
    default:
        break;
}
