const express = require("express");
require("dotenv").config();
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const connectDB = require("./db/connect")
const app = express();


const port = process.env.PORT || 3000
const mongoURL = process.env.MONGO_URI;

// parser
app.use(express.json());



app.get("/", (req, res) => {
    res.status(200).send("<h1>Landing page</h1></br><a href='/api/v1/products'>Go to products</a>")
});

app.get("/api/v1/tasks", (req, res) => {

    const { data } = res
    return res.status(200).json({ data })

})

// 404 middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB(mongoURL);
        app.listen(port, () => console.log(`Listening on port: ${port}...`));
    } catch (e) {
        console.log(e)
    }
}

start();