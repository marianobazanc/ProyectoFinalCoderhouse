import ticketModel from '../models/ticket.model.js';

class ticketManagerMongoose
{
    constructor()
    {        
    }

    createTicket = async(ticket)=>
    {
        try
        {
            const result = await ticketModel.create(ticket)
            return (result)
        }catch (error)
        {
            console.log(error.message)
        }
    }

    getTicket = async (tid) => 
    { 
        try {
            const ticket = await ticketModel.findById(tid).populate('products.product').lean();
            return ticket;    
            } catch (error) {
                console.log(error.message)   
            }
    }
}

export default ticketManagerMongoose;