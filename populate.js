// packages
require("dotenv").config();

// imports
const connectDB = require("./db/connect");
const productSchema = require("./models/products")

//local data
const localJsonData = require("./products.json");

const MONGO_URI = process.env.MONGO_URI;

const start = async () => {
    try {
        await connectDB(MONGO_URI);
        await productSchema.deleteMany();
        await productSchema.create(localJsonData);
        console.log("you did it champ")
        process.exit(0);
    } catch (e) {
        console.log(e)
        process.exit(1);
    }
}

start();