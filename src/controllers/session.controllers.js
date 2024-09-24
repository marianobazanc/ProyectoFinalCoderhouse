
import jwt from 'jsonwebtoken'
import { userService, cartService } from '../service/index.js'
import { createHash, isValidPassword } from '../utils/bcrypt.js';
import { generateToken,PRIVATE_KEY } from '../utils/jwt.js';
import { logger } from '../utils/logger.js'
import {sendEmail} from '../utils/sendEmail.js'

class UserCotroller
{
    constructor(){
     }

     loginUser = async(req, res) => {
        try
        {
        const { email, password} = req.body
        if (!email || !password) return res.status(401).send({status: 'error', error: 'Faltan ingresar datos'})
        let userExist = await userService.getUser({email})

        if (!userExist) return res.status(400).send({status: 'error', error: 'El usuario no existe'})

        const isValid= isValidPassword(password, userExist)
       
        if (!isValid){
            return res.status(400).send({status: 'error', error: 'Credenciales incorrectas'})
        }
        userExist.last_connection=Date.now ()

        const result = await userService.updateUser(userExist._id, userExist)
        
        const {_id, firts_name, last_name, role, cart } = userExist
        const token = generateToken({user:{
            email,
            firts_name,
            last_name, 
            role,
            cart, _id
        }, expiresIn: '24h'})
        req.user= userExist
       
        return res.cookie('token', token,{
        maxAge: 60*60*1000*24,
        httpOnly:true
        }).redirect('/products')
    }catch (error){
       logger.error(error)
       return res.status(500).send('Error: 500.')
    }
    }

    registerUser =  async(req, res) => {
        try
            {
            
            const {firts_name, last_name, email, password, age} = req.body
            
            if (!email || !password || !firts_name || !last_name) return res.status(401).send({status: 'error', error: 'Faltan ingresar datos'})
           
            const UserExist = await  userService.getUser({email})
            if (UserExist) return res.status(401).send({status: 'error', error: 'El usuario ya existe'})
            
            let newCarts= await cartService.createCart()

            const newUser={
                firts_name,
                last_name,
                age,
                email,
                password: createHash(password),
                cart: newCarts
            }
           const result = await userService.createUser(newUser)
           const userExist = await userService.getUser({email})
           const {_id, role, cart } = userExist
           const token = generateToken({user:{
            email,
            firts_name,
            last_name, 
            role,
            cart,_id
        }, expiresIn: '24h'})
        req.user= userExist

        logger.info ('Result register', result)
        if (result)
        {
            req.user= result
            return res.cookie('token', token,{
                maxAge: 60*60*1000*24,
                httpOnly:true
                }).redirect('/products')
        }
        }catch (error){
           logger.error(error)
           return res.status(500).send('Error: 500.')
        }
    }

    forgotPassword= async (req,res) =>{
    try{
        
        const { email } = req.body
        const UserExist = await  userService.getUser({email})
        if (!UserExist) return res.status(401).send({status: 'error', error: 'El usuario no existe'})

        const token = generateToken({UserExist, expiresIn: '1h'})
               
        const subject = 'Restablecer contraseña'
        const html = `
        <p> Hola ${UserExist.firts_name}, </p>
        <p> Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:</p>
        <a href="http://localhost:8080/resetpass/${token}">Restablecer contraseña</a>
        <p>Este enlace expirará en 1 hora.</p>
    `
        await sendEmail({mail:  UserExist.email,
            subject,
            html
        })
    
        res.status(200).send({status: 'success', message: 'Mail enviado, revise su bandeja de entrada o spam'})
    }catch (error){
        logger.error(error)
        return res.status(500).send('Error: 500.')
     }
    }

    resetPassword = async (req, res)=>{
        try {
            
            const { passwordNew, passwordConfirm, token } = req.body
            
            if (!passwordNew || !passwordConfirm || passwordNew !== passwordConfirm) return res.status(400).send({
                status: 'error', 
                message: 'Las contraseñas no pueden estar vacías y deben coincidir'
            })
            if (passwordNew !== passwordConfirm) return res.status(400).send({status: 'error', message: 'Las contraseñas no coinciden'})
            
            const decodedUser = jwt.verify(token, PRIVATE_KEY)
         
            if (!decodedUser) return res.status(400).send({status: 'error', message: 'El token no es válido o ha expirado'})
        
            const userDB = await userService.getUser( {email: decodedUser.UserExist.email})
  
            if (!userDB) return res.status(400).send({status: 'error', message: 'El usuario no existe'})
        
            const isValid= isValidPassword(passwordNew, userDB)

            if (isValid) return res.status(400).send({status: 'error', message: 'No puedes usar una contraseña anterior.'})
  
            userDB.password =  createHash(passwordNew)
            const result = await userService.updateUser(userDB._id, userDB)
                       
            if (!result) return res.status(400).send({status: 'error', message: 'Error al actualizar la contraseña'})
        
            res.status(200).send({
                status: 'success', 
                message: 'Contraseña ha sido actualizada correctamente'
            })
        } catch (error) {
            logger.error(error)
            return res.status(500).send({status: 'error', message: error})
        }
    }
    
    currentUser=  async (req, res) => {
        const user=  req.user.user
        logger.info('Usuario current',user.email)
    
        const userDTO = await userService.getUserDTO({ email: user.email })
        return res.status(200).send({status:"success",payload:userDTO})
    }

    logout=async(req, res) => {
        try
        {
            const cookie = req.cookies['token']
            const decodedUser = jwt.verify(cookie, PRIVATE_KEY)
            let userExist = await userService.getUser({email:decodedUser.user.email})
            userExist.last_connection=Date.now ()

            const result = await userService.updateUser(userExist._id, userExist)

            res.clearCookie('token');
            res.redirect('/')
    }catch (error){
       logger.error(error)
       return res.status(500).send('Error: 500.')
    }
    }
}

export default UserCotroller