var express = require('express');

var multer  = require('multer');

var controller = require('../controllers/user_controller');

var validate = require('../validate/user_validate');

var authMiddleware = require('../middlewares/auth_middleware');



var upload = multer({ dest: './public/uploads/' })

var router = express.Router();


router.get('/', controller.index);

router.get('/cookie', function(req, res, next) {
	res.cookie('id', 654321);
	res.send('alo');
})

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/detail/:userid', controller.getId);

router.post('/create', upload.single('avatar'), validate.postCreate, controller.postCreate);

router.get('/edit/:editid', controller.editGetId);

router.put('/edit', controller.postEdit);

/*router.get('/delete', controller.getDelete);


router.delete('/delete/:id', controller.delete);*/


module.exports = router;