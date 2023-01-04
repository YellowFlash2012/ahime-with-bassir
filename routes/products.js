import express from "express"
import asyncHandler from "express-async-handler"
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", asyncHandler(async (req, res) => {
    const products = await Product.find();

    res.send(products);
}))

router.get("/:id", asyncHandler( async(req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.status(200).send(product);
    } else {
        res.status(404).send({ message: "Product NOT found!" });
    }
}));

router.get("/slug/:slug", asyncHandler(async(req, res) => {
    const product = await Product.findOne({slug:req.params.slug});

    if (product) {
        res.status(200).send(product);
    } else {
        res.status(404).send({ message: "Product NOT found!" });
    }
}));

export default router