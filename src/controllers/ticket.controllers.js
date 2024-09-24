import { productService, cartService, ticketService , userService} from '../service/index.js'
import { v4 as uuidv4 } from 'uuid';

class TicketController
{
    constructor(){
    }


    purchase = async (req, res)=>{
        const {cid} = req.params;
        const carrito= await (cartService.getCart(cid));
        if (!carrito)
        {
            return res.status(404).send(`Carrito con id ${cid} no existe.`);
        }
  
        const productsNotPurchased = [];
        let total= 0
        for (const item of carrito.products) {
            const product =item.product;
            const quantity= item.quantity;
            const productStock= await productService.getProduct(product._id)
            if (productStock.stock< quantity)
            {
                productsNotPurchased.push(product._id);
            } else
            {
                total = total + (quantity*productStock.price)
                productStock.stock=  productStock.stock - quantity
                await productService.updateProduct(product._id,productStock)
            }
        }
        const productosOK= carrito.products.filter(item=> !productsNotPurchased.includes(item.product._id))
        if (productosOK.length>0)
        {
            const email= req.user.user.email
            const usuario = await userService.getUser({email}) 
            const uuid = uuidv4();
            const newTicket={
                code:uuid,
                amount:total,
                user: usuario,
                products: productosOK
            }
            const result = await ticketService.createTicket(newTicket)
                    
            if (productsNotPurchased.length > 0) {
                const productosEliminar= carrito.products.filter(item=> productsNotPurchased.includes(item.product._id))
                await cartService.updateProduct(cid, productosEliminar);
            } else {
                await cartService.deleteCart(cid);
            }
            console.log ('Ticket', result)
            
            return res.status(200).json({
                status: 'success',
                message: `La compra se realizo correctamente Code:${result.code} y quedaron ${productsNotPurchased.length} producto sin poder comprar por falta de stock` ,
                productsNotPurchased,
                ticketId: result._id
            });
        }
        else
        {
            return res.status(200).json({
                status: 'error',
                message: `No se pudo realizar la compra porque no existen productos en stock` ,
                productsNotPurchased,
                ticketId: 0 });
        }
    }    
}

export default TicketController