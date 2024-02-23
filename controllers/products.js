
const getProducts = (req, res) => {
    return res.status(200).send("<h1>Products get all</h1>")
}

module.exports = {getProducts}