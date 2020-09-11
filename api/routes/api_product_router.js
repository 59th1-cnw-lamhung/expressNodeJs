var express = require('express');

var controller = require('../controllers/api_product_controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/:id', controller.find);
router.put('/:id', controller.edit);
router.delete('/:id', controller.delete);

module.exports = router;