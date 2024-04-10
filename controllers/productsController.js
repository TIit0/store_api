
const { query } = require("express");
const productSchema = require("../models/products");
const products = require("../models/products");

const getProducts = async (req, res) => {
    const { featured, company, name, sort: sortBy, fields, limit = 10, page = 1, numericFilters } = req.query;
    const queryObject = {};

    if (featured) {
        queryObject.featured = featured === "true" ? true : false;
    }

    if (company) {
        queryObject.company = company;
    }

    if (name) {
        queryObject.name = { $regex: name, $options: "i" }
    }

    if (numericFilters) {

        // regex to separate operators
        const regex = /\b(<|>|>=|=|<=)\b/g

        // object map technique # hashmap
        const operatorMap = {
            ">": "$gt",
            ">=": "$gte",
            "=": "$eq",
            "<": "$lt",
            "<=": "$lte",
        }

        /* 
        replace operators with mongoose Query and Projection operators:
        https://www.mongodb.com/docs/manual/reference/operator/query/#query-and-projection-operators 
        */
        let filters = numericFilters.replace(
            regex,
            (match) => `-${operatorMap[match]}-`
        );


        const options = ["price", "rating"];

        // manipulate data structure to match projection operators
        filters = filters.split(",").forEach((item) => {
            const [field, operator, value] = item.split("-");

            // set queryObject with required operators and query structure 
            if(options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
            }
        })
    }

    let results = productSchema.find(queryObject);

    // sorting logic
    if (sortBy) {
        const sortList = sortBy.split(",").join(" ")
        results = results.sort(sortList)
    } else {
        results = results.sort("createdAt")
    }

    // field filtering logic
    if (fields) {
        const fieldsList = fields.split(",").join(" ");
        results = results.select(fieldsList)
    }

    const skip = (page - 1) * limit

    // hit limiting logic
    if (limit) {
        results = results.skip(skip).limit(Number(limit));
    }




    // results creates the database query and we await for products for the database response bades on the query
    const products = await results
    return res.status(200).json({ NumHits: products.length, data: products })
}

const getProductsStatic = async (req, res) => {
    const { company, featured } = req.body

    const products = await productSchema.find({ company, featured })
    return res.status(200).json({ msg: 'static get all', numberOfHits: products.length, data: { products } })

}

module.exports = { getProducts, getProductsStatic }