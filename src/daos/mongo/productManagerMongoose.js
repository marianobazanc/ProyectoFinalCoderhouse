import productsModel from '../models/products.model.js';

class productManagerMongoose
{
    constructor()
    {        
    }

    addProduct = async(product)=>
    {
        try
        {
            const result = await productsModel.create(product)
            return (result)
        }catch (error)
        {
            console.log(error.message)
        }
    }

    deleteProduct = async (id) =>
    { 
        try
        {
            const result =  await productsModel.deleteOne({_id: id.trim()})
            return result
        }catch (error)
        {
            console.log(error.message)
        }
    }
    
    updateProduct = async(pid, prodUpdate) =>
    {
        try
        {
            const result =  await productsModel.findByIdAndUpdate({_id: pid}, prodUpdate, {new: true})        // await productsModel.updateOne({_id: pid},prodUpdate)
            return result
        }catch (error)
        {
            console.log(error.message)
        }
    }

    getProducts = async (limit, nropage,orden, estado, categoria)=>{
        try
        {
            let filtroEstado = {}
            if (estado) 
            {
                filtroEstado= {status: estado}
            }
             let filtroCatego = {}
             if (categoria) 
             {
                filtroCatego= { category: categoria}
             }
             const filtro = Object.assign({}, filtroEstado, filtroCatego);
           
            const products = await productsModel.paginate(filtro,{lean: true,limit:limit, page:nropage, sort: {price: parseInt(orden)}})
           
            return (products)
          
        }catch(error)
        {
            console.log(error.message)
        }
    }

    getProduct = async (idProducto) => { 
        try {
            const products = await productsModel.findById( idProducto).populate('owner').lean()
            return products;    
           } catch (error) {
               console.log(error.message)
           }
       }
}

export default productManagerMongoose;