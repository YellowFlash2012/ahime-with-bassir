import express from "express"
import asyncHandler from "express-async-handler"
import { isAuth } from "../middlewares/auth.js";
import Order from "../models/Order.js";

const router = express.Router();

// * place new order
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


// * pay order
router.put("/:id/pay", isAuth, asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();

        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address:req.body.email_address
        }
        
        const updatedOrder = await order.save();
        
        res.send({ message: "Successful payment!", order: updatedOrder });
    } else {
        res.status(404).send({ message: "Order Not Found!" });
    }
}))

// * get all logged in user's orders
router.get("/", isAuth, asyncHandler(async (req, res) => {
    
    const orders = await Order.find({user:req.user.id});
    
    if (orders) {
        res.status(200).send(orders)
    } else {
        res.status(404).send({message:'Orders Not Found!'})
    }

}))

// * get order by id
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