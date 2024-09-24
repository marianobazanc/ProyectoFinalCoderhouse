import messageModel from '../models/messages.model.js';

class messageManagerMongoose
{
    constructor()
    {        
    }

    addMessage = async(msg)=>
        {
            try
            {
                const result = await messageModel.create(msg)
                return (result)
            }catch (error)
            {
                console.log(error.message)
            }
        }

    getMessages = async ()=>{
            try
            {
                const messages = await messageModel.find()
                return (messages)
            }catch(error)
            {
                console.log(error.message)
            }
        }
}

export default messageManagerMongoose;