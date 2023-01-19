import jwt from "jsonwebtoken"
import User from "../models/User.js";

export const isAuth = async (req, res, next) => {
    const authorization = req.headers.authorization;


    if (authorization) {
        const token = authorization.slice(7, authorization.length);

        jwt.verify(token, process.env.jwt_secret, async (err, decode) => {
            if (err) {
                res.status(401).send({ message: "Invalid token" });
            } else {
                const user = await User.findById(decode.id);
                req.user = user;

                next();
            }
        });
    } else {
        res.status(401).send({ message: "No token" });
    }
}

export const isAdmin = (req, res, next) => { 
    console.log(req.user);
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).send("This is admin territory!")
    }
}
