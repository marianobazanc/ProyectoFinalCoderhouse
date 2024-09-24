import { Router }  from 'express'
import jwt from 'jsonwebtoken'
import { productService , userService, cartService,ticketService} from '../service/index.js'
import userDTO from '../dto/user.dto.js'
import { passportCall } from '../middlewares/passportCall.middleware.js'
import { authorization } from "../middlewares/authorization.middleware.js";
import { configObject } from '../config/config.js';
import { PRIVATE_KEY } from '../utils/jwt.js';
import { logger } from '../utils/logger.js'

const router = Router()
const {user_admin} = configObject

router.get('/products',passportCall('jwt'), async (req, res)=>{
    let { limit , nropage , sort } = req.query

    if (typeof limit === "undefined") { limit = 10;  }
    if (typeof nropage === "undefined") {nropage = 1;}
    if (typeof sort === "undefined") { sort = 1; }

    const  { docs, page, hasPrevPage, hasNextPage, prevPage, nextPage } = await (productService.getProducts(limit,nropage, sort));
       
     const usuario = req.user.user
    
     const nombre= usuario.first_name 
  
    let esAdmin
    if (usuario.role== 'admin' || usuario.role== 'premium') {
        esAdmin=true
    }
    else
        esAdmin=false

    let roleAdmin
    if (usuario.role== 'admin') {
        roleAdmin=true
    }
    else
        roleAdmin=false

    res.render('products', {productos:docs,
        page, 
        hasNextPage,
        hasPrevPage,
        nextPage,
        prevPage, nombre, role:esAdmin, cart: usuario.cart, id:usuario._id, roleAdmin})
})

router.get('/', async (req, res)=>{
    let { limit , nropage , disponibilidad, sort } = req.query

    if (typeof limit === "undefined") { limit = 10;  }
    if (typeof nropage === "undefined") {nropage = 1;}
    if (typeof sort === "undefined") { sort = 1; }

    const  { docs, page, hasPrevPage, hasNextPage, prevPage, nextPage } = await (productService.getProducts(limit,nropage, sort));
        
    res.render('home', {productos:docs,
        page, 
        hasNextPage,
        hasPrevPage,
        nextPage,
        prevPage})
})

router.get('/login', async (req, res)=>{
    res.render('login',{} )
})

router.get('/register', async (req, res)=>{
    res.render('register',{} )
})

router.get('/uploadfile',passportCall('jwt'),async (req, res)=>{
    const usuario = req.user.user
    res.render('uploadfile',{user:usuario} )
})

router.get('/forgotPassword', async (req, res)=>{
    res.render('forgotPassword',{} )
})

router.get('/resetPass/:token', async (req, res)=>{
    try {
        const {token} = req.params

        const decodedUser = jwt.verify(token, PRIVATE_KEY)
        logger.info ('decodedUser', decodedUser)
        
        if (!decodedUser) return res.status(400).send({status: 'error', message: 'El token no es válido o ha expirado'})

        res.render('resetPass',{token})
    } catch (error) {
        if (error.name === 'TokenExpiredError'){
            logger.error('Token Expirado')
            res.render('forgotPassword',{} )
        }
        else{
            logger.error('Reserpass', error)
            res.status(401).send({status: 'error', message: 'El token no es válido'})
        }
    }
})

 router.get('/carts/:cid',passportCall('jwt'), async (req, res)=>{
      const { cid } = req.params
      const carrito= await (cartService.getCart(cid));
      const productos = carrito.products
      res.render('carts', {productos})
 })

 router.get('/adminproducts', passportCall('jwt'),authorization('admin','premium'), async (req, res)=>{
    const productos= await (productService.getProducts(10,1,1));
    res.render('adminProductos', {productos:productos.docs})
})

router.get('/ticket/:tid',passportCall('jwt'), async (req, res)=>{
    const { tid } = req.params
    const ticket= await (ticketService.getTicket(tid));
    res.render('ticket', {ticket})
})

router.get('/users',passportCall('jwt'),authorization('admin'), async (req, res)=>{
    let { limit , nropage} = req.query

    if (typeof limit === "undefined") { limit = 10;  }
    if (typeof nropage === "undefined") {nropage = 1;}
   
    const  { docs, page, hasPrevPage, hasNextPage, prevPage, nextPage } = await (userService.getUsers(limit,nropage));

    const usersDTO= docs.map(user => new userDTO(user));
   
    res.render('users', {users:usersDTO,
        page, 
        hasNextPage,
        hasPrevPage,
        nextPage,
        prevPage})
})

 router.post('/products', passportCall('jwt'),authorization('user','premium'),async (req, res) => {
    const {prodId , txtCantidad , CartId} = req.body
    const usuario = req.user.user

    if (usuario.role==='premium') 
    {
        const owner = await userService.getUser({email:usuario.email})
        const producto = await  productService.getProduct(prodId)
        if (String(owner._id) == String(producto.owner._id)){
            return res.status(404).send({ status: 'error', payload:(`No puede agregar un producto propio al carrito`) })
        } 
    }
    const cart = await cartService.getCart(CartId)
    const result= await (cartService.addCart(CartId,prodId,txtCantidad));
    res.redirect('/carts/'+ CartId)
}); 
router.get('/realtimeproducts', passportCall('jwt'),authorization('admin','premium'), async(req, res)=>{
    const { socketServer } = req

    socketServer.on('connection', async (socket) => {
        const usuario = req.user.user
  
        socket.on('agregarProducto', async data=>{
            const { title, description,price, thumbnail,code,stock,status, category} = data
            let owner = usuario
            if (usuario.role==='premium') 
            {
               owner = await userService.getUser({email:usuario.email})
            }
            else{
               owner = await userService.getUser({email:user_admin})
            }

            const newProduct={
                title,
                description,
                price,
                thumbnail: 'Sin Imagen',
                code,stock,
                status:1, category,owner
            }
            await productService.addProduct (newProduct)
         })      
         
        socket.on('eliminarProducto', async data=>{
            const { id } = data
            const trimmedId = id.trim(); 
            await productService.deleteProduct(trimmedId);
        })      

       const productos= await (productService.getProducts(10,1,1));
       socket.emit("cargarProductos",  productos.docs);
    });
})

export default router