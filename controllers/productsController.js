
const { query } = require("express");
const productSchema = require("../models/products");
const products = require("../models/products");

const getProducts = async (req, res) => {
    const { featured, company, name, sort: sortBy, fields, limit } = req.query;
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



    let results =  productSchema.find(queryObject);

    // sorting logic
    if ( sortBy ) {
        const sortList = sortBy.split(",").join(" ")
        results = results.sort(sortList)
    } else {
        results = results.sort("createdAt")
    }

    // field filtering logic
    if ( fields ) {
        const fieldsList = fields.split(",").join(" ");
        results = results.select(fieldsList)
    }

    // hit limiting logic
    if (limit) {
        results = results.limit(Number(limit));
    }

    // results creates the database query and we await for products for the database response bades on the query

    const products = await results
    console.log(products)
    return res.status(200).json({ NumHits: products.length, data: products })
}

const getProductsStatic = async (req, res) => {
    const { company, featured } = req.body

    const products = await productSchema.find({ company, featured })
    return res.status(200).json({ msg: 'static get all', numberOfHits: products.length, data: { products } })

}

module.exports = { getProducts, getProductsStatic }