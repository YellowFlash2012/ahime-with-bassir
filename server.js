import express from "express"
import colors from "colors"
import { config } from "dotenv"
import morgan from "morgan"
import helmet from "helmet"

import data from "./database/data.js"



config()

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(helmet())

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.get('/api/v1/products', (req, res) => {
    res.status(200).send(data.products)
})

app.get('/api/v1/products/:id', (req, res) => {
    const product = data.products.find((x) => x._id === req.params.id);

    if (product) {
        res.status(200).send(product);
    } else {
        res.status(404).send({ message: "Product NOT found!" });
    }
})

app.get('/api/v1/products/slug/:slug', (req, res) => {
    const product = data.products.find(x => x.slug === req.params.slug);

    if (product) {
        res.status(200).send(product)
        
    } else {
        res.status(404).send({message:"Product NOT found!"})
    }
})

app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode | Port ${port}`.yellow.bold);
})