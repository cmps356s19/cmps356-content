const productRepo = require('../repositories/ProductRepository');

class ProductService {
    async getProducts(req, res) {
        try {
            const products = await productRepo.getProducts(req.query.category);
            res.status(200).json(products);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async getProduct(req, res) {
        try {
            const product = await productRepo.getProduct(req.params.id);
            res.status(200).json(product);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async addProduct(req, res) {
        try {
            const product = await productRepo.addProduct(req.body);
            res.status(201).json(product);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async updateProduct(req, res) {
        try {
            const productId = req.params.id;
            await productRepo.updateProduct(productId, req.body);
            res.status(200).send("Product updated.");
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = new ProductService();