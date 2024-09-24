import fs from 'fs'

class CartsManager
{
    #carts;
    #path;
       
    constructor(path)
    {
        this.#path=path;
    }

    leerArchivo = async () => {
        try {
            const dataJson = await fs.promises.readFile(this.#path, 'utf-8')
            return JSON.parse(dataJson)            
        } catch (error) {
            return []
        }
    } 

    createCart = async () =>
    {
    try
        {
            this.#carts = await this.leerArchivo()
        
            const cart= {
                    id: this.#getNextId(),
                    products: [],
            } ;
            this.#carts.push(cart);
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts, null, '\t'), 'utf-8')
    } catch (error)
    {
        console.log(error.message)
    }
    }
   
    #getNextId() {
        if (this.#carts.length === 0) {
        return 1;
        }
        return this.#carts.at(-1).id + 1;
    }


    getCartsById = async (idCarrito) => { 
        try {
               const result = await fs.promises.readFile(this.#path, 'utf-8')
               this.#carts=  JSON.parse(result);
              
               const carrito = this.#carts.find((carrito) => carrito.id === idCarrito);
                              
               return carrito;    
           } catch (error) {
               console.log(error.message)
           }
       }

       addCarts = async(idCarrito, nuevoProducto) =>
      {
          this.#carts = await this.leerArchivo()

          const carrito = this.#carts.find((carrito) => carrito.id === idCarrito);
          const indiceCar = this.#carts.findIndex(carr => carr.id === idCarrito);
      
          const indiceProducto = carrito.products.findIndex(prod => prod.id === nuevoProducto.id);

          if (indiceProducto === -1) 
          {
            carrito.products.push(nuevoProducto)
          }
          else {
            carrito.products[indiceProducto].quantity++;
          }
   
          this.#carts[indiceCar]= carrito;
          await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts, null, '\t'), 'utf-8')
      }
}

export default CartsManager;