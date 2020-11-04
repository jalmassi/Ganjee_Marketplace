import express from 'express';
import Product from '../models/productModels';
import { isAdmin, isAuth } from '../util';

const router = express.Router();

router.get("/", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

router.get("/:id", async (req, res) => {
    const product = await Product.findOne({_id: req.params.id});
    if(product){
        res.send(product);
    } else{
        res.status(404).send({message: "Product Not Found"})
    }
});

router.delete("/:id", async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if(deletedProduct){
        await deletedProduct.remove();
        res.send({message: "Product Deleted"});
    } else{
        res.send("Error in Deletion");
    }

})

router.put("/:id", async (req, res) => {
    const productId = req.params.id;
    console.log("inside put");
    const product = await Product.findById(productId);
    if(product){
        product.name = req.body.name;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.price = req.body.price;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
    }

    const changedProduct = await product.save();
    if(changedProduct){
        res.status(200).send({message: 'New Product Changed', data: changedProduct});
    }
    return res.status(500).send({message: 'Error in Creating product.'});
})

router.post("/", async (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
    });
    const newProduct = await product.save();
    if(newProduct){
        res.status(201).send({message: 'New Product Created', data: newProduct});
    }
    return res.status(500).send({message: 'Error in Creating product.'});
})

export default router;
