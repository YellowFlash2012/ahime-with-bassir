import express from "express"
import asyncHandler from "express-async-handler"
import { isAuth } from "../middlewares/auth.js";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/", isAuth, asyncHandler(async (req, res) => {
    // console.log(req.user.id);

    const newOrder = new Order({
        orderItems: req.body.orderItems.map(x => ({ ...x, product: x._id })),

        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        
        itemsAmount: req.body.itemsAmount,
        shippingAmount: req.body.shippingAmount,
        taxAmount: req.body.taxAmount,
        totalAmount: req.body.totalAmount,
        
        user: req.user.id
    });

    const order = await newOrder.save();

    res.status(201).send({message:"You successfully placed your order!", order})
}))

router.get("/:id", isAuth, asyncHandler(async (req, res) => {

    console.log(req.params.id);
    
    const order = await Order.findById(req.params.id);

    if (order) {
        res.status(200).send(order)
    } else {
        res.status(404).send({message:'Order Not Found!'})
    }

}))

export default router