import express from "express"
import colors from "colors"
import { config } from "dotenv"
import morgan from "morgan"
import helmet from "helmet"


import connectDB from "./config/db.js"
import seedRoutes from "./routes/seedRoutes.js"
import productRoutes from "./routes/products.js"
import orderRoutes from "./routes/orders.js"
import userRoutes from "./routes/users.js"
import uploadRoutes from "./routes/uploads.js"
import path from "path"



config()

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(helmet())

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.get("/api/v1/keys/paypal", (req, res) => {
    res.send(process.env.paypal_client_id || "sb")
})

app.get("/api/v1/keys/google", (req, res) => {
    res.send(process.env.google_maps_api || "")
})

app.use("/api/v1/seed", seedRoutes);
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/orders", orderRoutes)

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/uploads", uploadRoutes)

// ***heroku deploy config
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "./client/build/index.html"))
    })
    
}


// ***error handling
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
})

connectDB()
app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode | Port ${port}`.yellow.bold);
})