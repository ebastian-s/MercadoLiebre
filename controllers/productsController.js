const db = require('../database/models');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const formatPrice = (price, discount) => toThousand(Math.round(price * (1 - (discount / 100))));

/**
 * Controller
 */
const controller = {
    // Root - Show all products
    root: (req, res) => {
        // Do the magic
        // Do the magic
        db.Productos.findAll()
            .then((productosResultado) => {
                if (productosResultado) {
                    res.render('products', { toThousand, formatPrice, productosAll: productosResultado });
                } else {
                    res.send("error");
                }
            });

    },

    // Detail - Detail from one product
    detail: (req, res) => {
        // Do the magic
        db.Productos.findByPk(req.params.productId)
            .then((productosResultado) => {
                if (productosResultado) {
                    res.render('detail', { toThousand, formatPrice, producto: productosResultado });
                } else {
                    res.send("error");
                }
            });
    },

    // Create - Form to create
    create: (req, res) => {
        // Do the magic
        res.render('product-create-form');

    },

    // Create -  Method to store
    store: (req, res, next) => {
        // Do the magic
        //console.log(req.files[0].filename);
        db.Productos.create({
            name: req.body.name,
            description: req.body.description,
            image: '/images/products/' + req.files[0].filename,
            price: req.body.price,
            discount: req.body.discount,
            category: req.body.category
        });
        res.redirect('/');
    },

    // Update - Form to edit
    edit: (req, res) => {
        // Do the magic
        db.Productos.findByPk(req.params.productId)
            .then((productoEditar) => {
                if (productoEditar) {
                    res.render('product-edit-form', { productToEdit: productoEditar });
                } else {
                    res.send("error");
                }
            });

    },
    // Update - Method to update
    update: (req, res) => {
        // Do the magic
        db.Productos.update({
            name: req.body.name,
            description: req.body.description,
            image: '/images/products/' + req.files[0].filename,
            price: req.body.price,
            discount: req.body.discount,
            category: req.body.category
        }, {
            where: {
                id: req.params.productId,
            }
        });
        res.redirect('/');


    },

    // Delete - Delete one product from DB
    destroy: (req, res) => {
        // Do the magic
        db.Productos.destroy({
            where: {
                id: req.params.productId
            }
        })
        res.redirect('/')
    }
};

module.exports = controller;