import express from "express"
import data from "../database/data.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
    await Product.remove({})

    const newPdts = await Product.insertMany(data.products);

    await User.remove({})

    const newUsers = await User.insertMany(data.users);

    res.send({newPdts, newUsers})
})

export default router