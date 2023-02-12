import express from "express"
import asyncHandler from "express-async-handler"
import { isAdmin, isAuth } from "../middlewares/auth.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/", isAuth, isAdmin, asyncHandler(async (req, res) => {
    const users = await User.find();

    res.status(200).send(users)
}))

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

router.put("/profile", isAuth, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;

        const updatedUser = await user.save();
        const token = updatedUser.createJWT();

        res.status(201).json({ message: "User updated successfully!", data: { _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, isAdmin: updatedUser.isAdmin, token: token } });
    } else {
        res.status(404).send("User Not Found!")
    }
}))

// get one single user by admin
router.get(
    "/:id",
    isAuth,
    isAdmin,
    asyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);

        if (user) {
            res.status(200).send(user)
        } else {
            res.status(404).send({message:"user NOT found!"});
            
        }

    })
);

// update one single user by admin
router.put(
    "/:id",
    isAuth,
    isAdmin,
    asyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.isAdmin = Boolean(req.body.name);

            const updatedUser = await user.save();
            res.status(201).send({ message: "User updated!", updatedUser });
        } else {
            res.status(404).send({message:"user NOT found!"});
            
        }

    })
);

// delete one single user by admin
router.delete(
    "/:id",
    isAuth,
    isAdmin,
    asyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);

        if (user) {
            if (user.isAdmin) {
                return res.status(400).send({message:"Can NOT delete an admin"})
            }

            await user.remove();

            res.status(200).send({message:"User deleted!"})
        } else {
            res.status(404).send({message:"user NOT found!"});
            
        }

    })
);

export default router