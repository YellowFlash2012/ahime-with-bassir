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
    res.send(data.products)
})

app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode | Port ${port}`.yellow.bold);
})