import cartsModel from '../models/carts.model.js';

class cartsManagerMongoose
{
    constructor()
    {        
    }

    createCart = async()=>
    {
        try
        {   
            const cart= {
                products: []
        } ;
            const result = await cartsModel.create(cart)
            return (result)
        }catch (error)
        {
            console.log(error.message)
        }
    }

    getCart = async (idCarrito) => 
    { 
        try {
            const cart = await cartsModel.findById({_id: idCarrito}).populate('products.product').lean()
            return cart;    
           } catch (error) {
               console.log(error.message)   
           }
    }

    deleteProcuct = async(idCarrito, pid) =>
    {
        try {

            const cart = await cartsModel.findOne({ _id: idCarrito, 'products.product': pid });
            if (cart)
            {
                const result = await cartsModel.updateOne(
                    { _id: idCarrito },
                    { $pull: { products: { product: pid } } },
                    { new: true }
                );
            }    
        }
        catch (error) {
            console.log(error.message)
        }
    }

    deleteCart = async(idCarrito) =>
        {
            try {
    
                const cart = await cartsModel.findOne({ _id: idCarrito});
                if (cart)
                {
                    const result =  await cartsModel.updateMany({ _id: idCarrito}, { $set: { products: [] } })
                }    
            }
            catch (error) {
                console.log(error.message)
            }
        }

    addCart = async(idCarrito, nuevoProducto, quantity) =>
        {
           const carrito = await cartsModel.findOne({ _id: idCarrito, 'products.product': nuevoProducto });
                     
           if (carrito)
            {
                 const result = await cartsModel.findOneAndUpdate(
                    { _id: idCarrito },
                    { $set: { products: { product: nuevoProducto, quantity:quantity  } } } )           
                return result     
            }    
          else
              {
                   const result = await cartsModel.findOneAndUpdate(
                       { _id: idCarrito },
                       { $push: { products: { product: nuevoProducto, quantity: quantity } } } )
                   return result       
              }
        }

    addAllProcuct = async(idCarrito, carrito) =>
    {
        try {
            const result = await cartsModel.findByIdAndUpdate({_id: idCarrito},carrito)
            return result
        }
        catch (error) {
            console.log(error.message)
        }
    }

    updateProduct = async(idCarrito, carrito) =>
    {
        try {
            const result = await cartsModel.findByIdAndUpdate(
                idCarrito,
                { $set: { products: carrito } },
                { new: true } 
            );
            return result
        }
        catch (error) {
            console.log(error.message)
        }
    }
}

export default cartsManagerMongoose;