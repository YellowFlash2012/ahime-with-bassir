import express from "express"
import colors from "colors"
import { config } from "dotenv"
import morgan from "morgan"
import helmet from "helmet"


import connectDB from "./config/db.js"
import seedRoutes from "./routes/seedRoutes.js"
import productRoutes from "./routes/products.js"
import userRoutes from "./routes/users.js"



config()

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(helmet())

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use("/api/v1/seed", seedRoutes);
app.use("/api/v1/products", productRoutes)

app.use("/api/v1/users", userRoutes);


app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
})

connectDB()
app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode | Port ${port}`.yellow.bold);
})