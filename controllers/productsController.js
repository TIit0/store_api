
const { query } = require("express");
const productSchema = require("../models/products")

const getProducts = async (req, res) => {
    const { featured, company, name } = req.query;
    const queryObject = {};

    if (featured) {
        queryObject.featured = featured === "true" ? true : false;
    }

    if ( company ) {
        queryObject.company = company;
    }

    if ( name ) {
        queryObject.name = {$regex: name, $options: "i"}
    }


console.log(queryObject)
    const products = await productSchema.find(queryObject)
    return res.status(200).json({ msg: "testing routes", data: products })
}

const getProductsStatic = async (req, res) => {
    const { company, featured } = req.body

    const products = await productSchema.find({ company, featured })
    return res.status(200).json({ msg: 'static get all', numberOfHits: products.length, data: { products } })

}

module.exports = { getProducts, getProductsStatic }