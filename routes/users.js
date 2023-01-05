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

export default router