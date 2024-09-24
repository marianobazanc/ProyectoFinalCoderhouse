export default class CartRepositories{
    constructor(CartDao){
        
        this.CartDao= CartDao
    }

    async createCart ()
    {
        try
        {
             return await this.CartDao.createCart()
        }   
        catch (error)
        {
            return error
        }
    }

    async getCart (cid)
    {
        try
        {
             return await this.CartDao.getCart(cid)
        }   
        catch (error)
        {
            return error
        }
    }
    

    async addCart (cid, pid,quantity)
    {
        try
        {
             return await this.CartDao.addCart(cid,pid,quantity)
        }   
        catch (error)
        {
            return error
        }
    }

    addAllProcuct = async(idCarrito, carrito) =>
    {
        try {
            return await this.CartDao.addAllProcuct(idCarrito,carrito)
            
        }
        catch (error) {
            console.log(error.message)
        }
    }

    async deleteProcuct (cid, pid)
    {
        try
        {
             return await this.CartDao.deleteProcuct(cid,pid)
        }   
        catch (error)
        {
            return error
        }
    }

    async deleteCart (cid)
    {
        try
        {
             return await this.CartDao.deleteCart(cid)
        }   
        catch (error)
        {
            return error
        }
    }

    async updateProduct (idCarrito, carrito)
    {
        try
        {
             return await this.CartDao.updateProduct(idCarrito, carrito)
        }   
        catch (error)
        {
            return error
        }
    }

}