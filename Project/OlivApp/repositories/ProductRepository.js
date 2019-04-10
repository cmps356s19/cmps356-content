const path = require("path");
const fs = require("fs-extra");
const productsFilePath = path.resolve(__dirname,"../data/products.json");

//ToDo: Implement ProductRepository methods
class ProductRepository {
    async getProducts(category) {
        let products = await fs.readJson(productsFilePath);
        if(category)
            products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());

        return products;
    }

    async getProduct(id) {
        const products = await this.getProducts();
        return products.find(p => p._id == id);
    }

    async addProduct(product) {
        const products = await this.getProducts();
        product._id = products.length + 1;
        products.push(product);
        await this.saveProducts(products);
        return product;
    }

    async updateProduct(productId, product) {
        const products = await this.getProducts();
        const index = products.findIndex(p=> p._id == productId);
        products[index] = product;
        await this.saveProducts(products);
    }

    async saveProducts(products) {
        await fs.writeJSON(productsFilePath,products);
    }

    //ToDo: Load the products into the database if the
    // products collection is empty.
    initDb() {

    }
}

module.exports = new ProductRepository();