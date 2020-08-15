const express = require('express');
const router = express.Router();

//  Controller Require 
const mainController = require('../controllers/mainController');

router.get('/', mainController.root); /*  home  */
router.get('/search', mainController.search); /*  Buscador */
router.get('/offers', mainController.offers); /*  offers */

module.exports = router;