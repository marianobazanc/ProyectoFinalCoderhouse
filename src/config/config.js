import dotenv from 'dotenv'
import commander from '../utils/commander.js'
const { mode } =  commander.opts()
dotenv.config();

export const configObject ={
    port:            process.env.PORT || 8080, 
    TEST_MAIL:       process.env.TEST_MAIL_ADMIN     || '', 
    MAIL_PASS:       process.env.TEST_MAIL_PASS      || '',
    ACCOUNT_SID:     process.env.TWILIO_ACCOUNT_SID  || '',
    AUTH_TOKEN:      process.env.TWILIO_AUTH_TOKEN   || '',
    PHONE_NUMBER:    process.env.TWILIO_PHONE_NUMBER ||'',
    NUMBER_MIO:      process.env.NUMBER_MIO          || '',
    adminName:       process.env.ADMIN_NAME          || 'admin',
    adminPassword:   process.env.ADMIN_PASSWORD      || 'admin', 
    persistence:     process.env.PERSISTENCE         || 'MONGO',  
    jwt_private_key: process.env.JWT_SECRET_KEY      || '', 
    base_url:        process.env.BASE_URL            || '',
    MONGO_URL:       process.env.DATABASE_URL,
    gmail_pass:      process.env.GMAIL_PASS,
    gmail_email:     process.env.GMAIL_USER,
    user_admin:      process.env.USER_ADMIN
}
