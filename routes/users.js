import express from "express"
import asyncHandler from "express-async-handler"
import User from "../models/User.js";

const router = express.Router();

router.post("/login", asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
        if (await user.matchPassword(req.body.password)) {
            const token = user.createJWT(user._id);
            res.status(200).send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: token
            });
            return;
        }
    }

    res.status(401).send({message:"Invalid credentials"})
}))

router.post("/", asyncHandler(async (req, res) => {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
        res.status(400).send({
            message: "User with that email already exists!",
        });
        return;
    }

    const newUser = new User({
        name: req.body.name,
        email:req.body.email,
        password:req.body.password,
    })

    const user = await newUser.save();
    const token = user.createJWT(user._id);

    res.status(201).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token:token
    })
}))

export default router