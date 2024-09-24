export default class UserRepositories{

    constructor(UserDao){
        this.UserDao= UserDao
    }

    async createUser(newUser)
    {
        try
        {
            return await this.UserDao.createUser(newUser)
        }   
        catch (error)
        {
            return error
        }
    }

    async getUser(email)
    {
        try
        {
            return await this.UserDao.getUser(email)
        }   
        catch (error)
        {
            return error
        }
    }

    
    async getUsers(limit, nropage,sort, status,category)
    {
        try
        {
            return await this.UserDao.getUsers(limit, nropage,sort, status,category)
        }   
        catch (error)
        {
            return error
        }
    }

    async getUsersLastConnection()
    {
        try
        {
            return await this.UserDao.getUsersLastConnection()
        }   
        catch (error)
        {
            return error
        }
    }
    
    async deleteUser(uid)
    {
        try
        {
            return await this.UserDao.deleteUser(uid)
        }   
        catch (error)
        {
            return error
        }
    }
    

    async getUserDTO(email)
    {
        try
        {
            return await this.UserDao.getUserDTO(email)
        }   
        catch (error)
        {
            return error
        }
    }

    async updateUser(uid, userUpdate)
    {
        try
        {
            return await this.UserDao.updateUser(uid, userUpdate)
        }   
        catch (error)
        {
            return error
        }
    }
    
}