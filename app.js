// express
const express = require("express");
const app = express();

// packages
require("dotenv").config();
require("express-async-errors");


const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const connectDB = require("./db/connect")
const productsRouter = require("./routes/productsRoutes")

// parser
app.use(express.json());

app.get("/", (req, res) => {
    return res.status(200).send("<h1><a href='/api/v1/products/'>Products</a></h1>")
});

// products router
app.use("/api/v1/products", productsRouter);

// errorHandler middleware
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

const start = async (port) => {
    try {
        await connectDB(mongoURI);
        app.listen(port, () => console.log(`Listening on port: ${port}...`));
    } catch(e) {
        console.log(e)
    }
}

start(port);