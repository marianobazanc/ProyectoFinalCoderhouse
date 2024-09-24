export default class TicketRepositories{

    constructor(TicketDao){
        this.TicketDao= TicketDao
    }

    async createTicket(ticket)
    {
        try
        {
            return await this.TicketDao.createTicket(ticket)
        }   
        catch (error)
        {
            return error
        }
    }

    async getTicket(tid)
    {
        try
        {
            return await this.TicketDao.getTicket(tid)
        }   
        catch (error)
        {
            return error
        }
    }
}