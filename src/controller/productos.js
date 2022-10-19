const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid');

class ProductsAPI {
    constructor() {
        this.productos = [{
           id: uuid(), title: 'Cuaderno', price: 220
        }];
    }

    exists(id) {
        const indice = this.productos.findIndex(aProduct => aProduct.id == id)

        return indice >= 0;
    }

    validateBody(data) {
        if (!data.title || !data.price || typeof data.title !== 'string' || typeof data.price !== 'number') throw createError(400, 'Datos invalidos');
    }

    getAll() {
        return this.productos;
    }

    getById() {
        const exist = this.exists(id);
        
        if (!exist) throw createError (404, 'El producto no existe.' );

        const indice = this.productos.findIndex(aProduct => aProduct.id == id)

        return this.productos(indice);
    }
    // agregamos un producto
    save(data) {
        this.validateBody(data);

        const nuevoProducto = {
            title: data.title,
            price: data.price,
            id: uuidv4(),
        }
        this.productos.push(nuevoProducto);
        return nuevoProducto;
    }

    findByIdAndUpdate(id, datanueva) {
         const exist = this.exists(id);
        
        if (!exist) throw createError(404, 'El producto no existe.');

        this.validateBody(datanueva);

        const indice = this.productos.findIndex(aProduct => aProduct.id == id)

        const oldProduct = this.productos(indice);

        const nuevoProducto = {
            title: datanueva.title,
            price: datanueva.price,
            id: oldProduct.id,
        }

        this.productos.splice(indice, 1, nuevoProducto);
        
        return nuevoProducto;
    }

    findByIdAndDelete(id) {
        const exist = this.exists(id);
        if (!exist) return;

        const indice = this.productos.findIndex(aProduct => aProduct.id == id)

        this.productos.splice(indice, 1);

    }
}
const instanciaProductsApi = new ProductsAPI();

module.exports = {
    ProductsController : instanciaProductsApi
}