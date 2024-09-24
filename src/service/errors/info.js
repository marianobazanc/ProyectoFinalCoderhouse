export const generateProductError = (product) => {
    return `Hay una de las propiedades del productos incompleta o no valido.
    listado de propiedades requeridos: 
    * Title: necesita ser un string, pero se recibio ${product.title}
    * Description: necesita ser un string, pero se recibio ${product.description}
    * price: necesita ser un numero, pero se recibio ${product.price}
    * code: necesita ser un string, pero se recibio ${product.code}
    * category: necesita ser un string, pero se recibio ${product.category}
    * stock: necesita ser un numero, pero se recibio ${product.stock}
   `
}