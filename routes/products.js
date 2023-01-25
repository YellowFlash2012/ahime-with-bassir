import express from "express";
import asyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../middlewares/auth.js";
import Product from "../models/Product.js";

const router = express.Router();

// ***admin routes***
// get all products
router.get("/admin", isAuth, isAdmin, asyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const products = await Product.find().skip(pageSize * (page - 1)).limit(pageSize);

    const productsCount = await Product.countDocuments();

    res.status(200).send({
        products,
        productsCount,
        page,
        pages:Math.ceil(productsCount/pageSize)
    })
}))

// create new product
router.post(
    "/",
    isAuth,
    isAdmin,
    asyncHandler(async (req, res) => {
        const newProduct = new Product({
            name: "sample name " + Date.now(),
            slug: "sample-name-" + Date.now(),
            image: "/images/p1.jpg",
            price: 0,
            category: "sample category",
            brand: "sample brand",
            countInStock: 0,
            rating: 0,
            numReviews: 0,
            description: "sample description"
        });

        const product = await newProduct.save();

        res.status(201).send({
            message:"Product created!",
            product,
            
        });
    })
);

// ***users routes***

// get all products
router.get(
    "/",
    asyncHandler(async (req, res) => {
        const products = await Product.find();

        res.send(products);
    })
);

const PAGE_SIZE = 3;
// get all products by search
router.get(
    "/search",
    asyncHandler(async (req, res) => {

        const { query } = req;

        const pageSize = query.pageSize || PAGE_SIZE;
        const page = query.page || 1;
        const category = query.category || "";
        const brand = query.brand || "";
        const price = query.price || "";
        const rating = query.rating || "";
        const order = query.order || "";
        const searchQuery = query.query || "";

        const queryFilter =
            searchQuery && searchQuery !== "all"
                ? {
                    name: {
                        $regex: searchQuery,
                        $options: 1,
                    },
                }
                : {};

        const categoryFilter =
            category && category !== "all" ? { category } : {};

        const ratingFilter =
            rating && rating !== "all"
                ? {
                    rating: {
                        $gte: Number(rating),
                    },
                }
                : {};

        const priceFilter =
            price && price !== "all"
                ? {
                    price: {
                        $gte: Number(price.split("-")[0]),
                        $lte: Number(price.split("-")[1]),
                    },
                }
                : {};

        const sortOrder = order === "featured" ? { featured: -1 } : order === "lowest" ? { price: 1 } : order === "highest" ? { price: -1 } : order === "toprated" ? { rating: -1 } : order === "newest" ? { createdAt: -1 } : { _id: -1 };

        const products = await Product.find({
            ...queryFilter,
            ...categoryFilter,
            ...priceFilter,
            ...ratingFilter
        }).sort(sortOrder).skip(pageSize * (page - 1)).limit(pageSize);

        const countProducts = await Product.countDocuments({
            ...queryFilter,
            ...categoryFilter,
            ...priceFilter,
            ...ratingFilter
        })
        

        res.status(200).send({
            products,
            countProducts,
            page,
            pages:Math.ceil(countProducts/pageSize)
        });
    })
);

// get all categories
router.get(
    "/categories",
    asyncHandler(async (req, res) => {
        const categories = await Product.find().distinct("category");

        res.send(categories);
    })
);

// get product by id
router.get(
    "/:id",
    asyncHandler(async (req, res) => {
        
        const product = await Product.findById(req.params.id);
        

        if (product) {
            res.status(200).send(product);
        } else {
            res.status(404).send({ message: "Product NOT found!" });
        }
    })
);

router.get(
    "/slug/:slug",
    asyncHandler(async (req, res) => {
        const product = await Product.findOne({ slug: req.params.slug });

        if (product) {
            res.status(200).send(product);
        } else {
            res.status(404).send({ message: "Product NOT found!" });
        }
    })
);

// update product by admin
router.put("/:id", isAuth, isAdmin, asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;

        await product.save()

        res.status(201).send({message:"Product updated successfully!"})
    } else {
        res.status(404).send({message:"Product Not Found!"})
    }
}))


export default router;
