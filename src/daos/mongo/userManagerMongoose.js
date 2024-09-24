import usersModel from '../models/users.model.js';
import userDTO from '../../dto/user.dto.js'

export class UserManagerMongoose {
   
  constructor()
  {        
  }
  
    async createUser(user) {
        const result = await usersModel.create(user)
        return result;    

    }
    updateUser = async(uid, userUpdate) =>
      {
        try
        {
          const result = await usersModel.findByIdAndUpdate( {_id: uid}, userUpdate, {new: true})    
          return result
        }
        catch (error)
          {
          }

       
      }
  
    async getUser(filter) {
      try {
        return await usersModel.findOne(filter)
       } catch (error) {
           console.log(error.message)
       }
    }

    async getUserDTO(filter) {
      try {
        const result=  await usersModel.findOne(filter)
        const usuario = new userDTO(result);
        return usuario
       } catch (error) {
           console.log(error.message)
       }
    }

    getUsers = async (limit, nropage)=>{
      try
      {
          const filtro=""
          const users = await usersModel.paginate(filtro,{lean: true,limit:limit, page:nropage})
          return (users)
        
      }catch(error)
      {
          console.log(error.message)
      }
    }

    getUsersLastConnection = async ()=>{
      try
      {
          const twoDaysAgo = new Date();
          twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
          
          const users = await usersModel.find({
            last_connection: { $lt: twoDaysAgo },
          });

          return (users)
        
      }catch(error)
      {
          console.log(error.message)
      }
    }

    deleteUser = async (uid) =>
      { 
          try
          {
              const result =  await usersModel.deleteOne( {_id: uid.trim()})
              return result
          }catch (error)
          {
              console.log(error.message)
          }
      }

  }

  export default UserManagerMongoose;