const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const path = require('path');
const multer = require('multer');


// multer https://www.npmjs.com/package/multer

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/products')
    },
    filename: function(req, file, cb) {
        //cb(null, file.fieldname + '-' + Date.now())
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage });



router.get('/', productsController.root); /* GET - All products */
router.get('/detail/:productId/:productCategory', productsController.detail); /* GET - Product detail */

/*** CREATE ***/
router.get('/create', productsController.create); /* GET - Form to create */
router.post('/create', productsController.store); /* POST - Store in DB */

/*** EDIT ***/
router.get('/edit/:productId', productsController.edit); /* GET - Form to create */
router.put('/edit/:productId', upload.any(), productsController.update); /* PUT - Update in DB */

/*** DELETE ***/
router.delete('/delete/:productId', productsController.destroy); /* DELETE - Delete from DB */

module.exports = router;