/* Scheema is the way you set up the structure for your data, values, keys etc */

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"]
    },
    price: {
        type: Number,
        required: [true, "Item must have a price"]
    },
    featured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    company: {
        type: String,
        // limited options example:  enum: ["ikea", "liddy", "caressa", "marcos" ],

        // to add customm err to limited options
        enum: {
            values: ["ikea", "liddy", "caressa", "marcos" ],
            message: "{VALUE} is not supported"
        },
        
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("Product", productSchema);