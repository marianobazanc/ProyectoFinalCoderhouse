import express from 'express'
import handlebars from 'express-handlebars'
import cors from 'cors'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUIExpress from 'swagger-ui-express'
import { Server } from 'socket.io'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import routerApp from '../src/routes/index.js'
import { configObject } from './config/config.js';
import { __dirname } from './utils.js'
import  messageSocket  from './utils/messageSocket.js'
import { connectDB } from './config/index.js'
import { initializePassport } from './config/passport.config.js'
import { handleErrors } from './middlewares/errors/index.js'
import { addLogger , logger } from './utils/logger.js'

const {port}= configObject

const app = express()

app.use(addLogger)

const swaggerOptions={
    definition:{
        openapi: '3.0.1',
        info:{
            title: 'Documentacion de EComerce',
            description: 'Api para realizar gestion de ecomerce'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const httpServer = app.listen(port, error => {
    if(error) logger.error(error)
    logger.info(`Escuchando en el puerto ${port}`)
})
const io = new Server(httpServer)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))
app.use(cookieParser())

app.engine('handlebars', handlebars.engine())

app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

initializePassport() 
app.use(passport.initialize())
app.use(messageSocket(io))

const specs= swaggerJsDoc(swaggerOptions)
app.use('/apidocs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs))

app.use(routerApp)
app.use(handleErrors())
connectDB()