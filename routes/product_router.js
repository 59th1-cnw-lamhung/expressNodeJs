var express = require('express');

var controller = require('../controllers/product_controller');

var validate = require('../validate/user_validate');

var authMiddleware = require('../middlewares/auth_middleware')

var router = express.Router();


router.get('/', controller.index);

//router.get('/search', controller.search);

/*router.get('/create', controller.create);

router.get('/detail/:userid', controller.getId);

router.post('/create', validate.postCreate, controller.postCreate);
*/
/*router.get('/edit/:editid', controller.editGetId);

router.put('/edit', controller.postEdit);*/

/*router.get('/delete', controller.getDelete);


router.delete('/delete/:id', controller.delete);*/


module.exports = router;