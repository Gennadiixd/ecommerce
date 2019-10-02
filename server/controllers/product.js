const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const {errorHandler} = require('../helpers/dbErrorHandler')

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (error, fields, files) => {
        if (error) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }

        const {name, description, price, category, shipping, quantity} = fields

        if (!name || !description || !price || !category || !shipping || !quantity) {
            return res.status(400).json({
                error: 'All fields are required'
            })
        }

        const product = new Product(fields);

        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image shuld be less than 1mb'
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
    })
    product.save((error, result) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json({result})
    });
}

exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((error, product) => {
        if (error || !product) {
            return res.status(400).json({
                error: "product not found"
            })
        }
        req.product = product;
        next();
    })
}

exports.read = (req, res) => {
    // due to huge photo size
    req.product.photo = undefined;
    return res.json(req.product);
}

exports.remove = (req, res) => {
    let product = req.product
    product.remove((error, deletedProduct) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json({
            message: 'Product deleted successfully'
        })
    })
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (error, fields, files) => {
        if (error) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }

        const {name, description, price, category, shipping, quantity} = fields

        if (!name || !description || !price || !category || !shipping || !quantity) {
            return res.status(400).json({
                error: 'All fields are required'
            })
        }

        const product = req.product;
        product = _.extend(product, fields)

        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image shuld be less than 1mb'
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
    });
    product.save((error, result) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json({result})
    });
};

/*
by sell = /products?sortBy=sold&order=asc(desc)&limit=4
by arrival = /products?sortBy=createdAt&order=asc(desc)&limit=4
if no params send return all products
*/

exports.list = (req, res) => {
    let order = req.query.order
        ? req.query.order
        : 'asc';
    let sortBy = req.query.sortBy
        ? req.query.sortBy
        : '_id';
    let limit = req.query.limit
        ? parseInt(req.query.limit)
        : 6;

    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((error, products) => {
            if (error) {
                return res.status(400).json({
                    error: "Products not found"
                });
            };
            res.send(products);
        });
}


/*
it will find the products based on request product category
products with same category will be returned
*/

exports.listRelated = (req, res) => {
    let limit = req.query.limit
        ? parseInt(req.query.limit)
        : 6;

    Product.find({_id: {$ne: req.product}, category: req.product.category})
        .limit(limit)
        .populate('category',  '_id name')
        .exec((error, products)=> {
            if (error) {
                return res.status(400).json({
                    error: 'Products not Found'
                });
            }
            res.json(products);
        });
}

exports.listCategories = (req, res) => {
    // find all categories in Product model
    Product.distinct('category', {}, (error, categories) => {
        if (error) {
            return res.status(400).json({
                error: 'Categories not Found'
            });
        }
        res.json(categories);
    });
}

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((error, data) => {
            if (error) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set('content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}