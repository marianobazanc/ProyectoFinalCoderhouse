import {createTransport} from 'nodemailer'
import { configObject } from '../config/config.js'

const {gmail_pass, gmail_email} = configObject

const transport= createTransport(
    {
        service: 'gmail',
        port:587, 
        secure: false,
        auth:{
           user:gmail_email,
           pass: gmail_pass
        }
    }
)

export const sendEmail= async ({mail, subject, html}) =>{
    return await transport.sendMail(
        {from:gmail_email,
         to:  mail, 
         subject,
         html
        }, function(err){
            if(err)
                console.log(err);
        }
    )

}
