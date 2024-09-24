
export default class ProductRepositories{
    constructor(ProductDao){
        
        this.productDao= ProductDao
    }

    async getProducts(limit, nropage,sort, status,category)
    {
        try
        {
            return await this.productDao.getProducts(limit, nropage,sort, status,category)
        }   
        catch (error)
        {
            return error
        }
    }

    async getProduct (pid)
    {
        try
        {
             return await this.productDao.getProduct(pid)
        }   
        catch (error)
        {
            return error
        }
    }

    async addProduct (newProduct)
    {
        try
        {
             return await this.productDao.addProduct(newProduct)
        }   
        catch (error)
        {
            return error
        }
    }

    async updateProduct (pid, prodUpdate)
    {
        try
        {
             return await this.productDao.updateProduct(pid, prodUpdate)
        }   
        catch (error)
        {
            return error
        }
    }

    async deleteProduct (pid)
    {
        try
        {
             return await this.productDao.deleteProduct(pid)
        }   
        catch (error)
        {
            return error
        }
    }

    async getProductStock (pid)
    {
        try
        {
             return await this.productDao.getProductStock(pid)
        }   
        catch (error)
        {
            return error
        }
    }

    
}

