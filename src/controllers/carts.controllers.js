
import { productService, cartService } from '../service/index.js'
import { logger } from '../utils/logger.js'

class CartController
{
    constructor(){
    }

    createCart = async(req, res) => {
    try
    {
        cartService.createCart()
        return res.status(200).send({ status: 'success', payload:('El carrito fue creado corectamente') })
    }catch (error){
        logger.error(error)
        return res.status(500).send('Error: 500.')
    }}
    
    getCart = async (req, res)=>{
        try
        {
        const { cid } = req.params
        const carrito= await (cartService.getCart(cid));
        if (!carrito)
        {
            return res.status(404).send(`Carrito con id ${cid} no existe.`);
        }
        return res.status(200).send({ status: 'success', payload: carrito })
    }catch (error){
       logger.error(error)
       return res.status(500).send('Error: 500.')
    }
    }

    addCart = async(req, res) => {
        try
        {
              const { cid , pid } = req.params
              let { quantity } = req.body
               
              const carrito= await (cartService.getCart(cid));
               if (!carrito)
               {
                   return res.status(404).send(`Carrito con id ${cid} no existe.`);
               }
               const producto = await productService.getProduct( pid)
               if (!producto)
               {
                   return res.status(404).send(`Producto con id ${pid} no existe`);
               }
   
               if (typeof quantity === "undefined") {
                   quantity = 1;
                }
              const result= await (cartService.addCart(cid,pid, quantity));
              return res.status(200).send({ status: 'success', payload:(`El producto con ID ${pid} fue agregado al carrito con Id ${cid}`) })
        }catch (error){
           logger.error(error)
           return res.status(500).send('Error: 500.')
        }
    }
    
    deleteCartProduct = async(req, res) => {
    try
    {
        const { cid , pid } = req.params
        const carrito= await (cartService.getCart(cid));
        if (!carrito)
        {
            return res.status(404).send(`Carrito con id ${cid} no existe.`);
        }
        const result= await cartService.deleteProcuct(cid, pid)
        return res.status(200).send({ status: 'success', payload:(`El producto con ID ${pid} fue eliminado del carrito con Id ${cid}`) })
    }catch (error){
       logger.error(error)
       return res.status(500).send('Error: 500.')
    }
    }
    
    deleteCart =  async(req, res) => {
    try
    {
        const { cid } = req.params
        const carrito= await (cartService.getCart(cid));
        if (!carrito)
        {
            return res.status(404).send(`Carrito con id ${cid} no existe.`);
        }
        const result= await cartService.deleteCart(cid)
        return res.status(200).send({ status: 'success', payload:(`Se vacio todo el carrito Id ${cid}`) })
    }catch (error){
        logger.error(error)
        return res.status(500).send('Error: 500.')
    }
    }

    updateCartProduct = async (req, res)=>{
        const {cid , pid} = req.params;
        const carrito= await (cartService.getCart(cid));
        if (!carrito)
        {
            return res.status(404).send(`Carrito con id ${cid} no existe.`);
        }
        const result= await (cartService.addCart(cid,pid,req.body.quantity));
        return res.status(200).send({ status: 'success', payload:(`Se actualizo la cantidad del producto en el carrito Id ${cid}`) })
    }

    addManyCartProducts = async (req, res)=>{
        const {cid} = req.params;
    
        const carrito= await (cartService.getCart(cid));
        if (!carrito)
        {
            return res.status(404).send(`Carrito con id ${cid} no existe.`);
        }
    
        carrito.products = req.body;
        const result= await cartService.addAllProcuct(cid, carrito)
        return res.status(200).send({ status: 'success', payload:(`Se agregaron todos los productos al carrito Id ${cid}`) })
    }
}

export default CartController