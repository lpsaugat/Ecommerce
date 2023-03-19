const router = require('express').Router();

const customerController = require('../controller/controller');

router.get('/', customerController.home);
router.get('/AboutUs', customerController.aboutus);
router.get('/add_product', customerController.add_product)
router.post('/add', customerController.add)
router.get('/slider', customerController.slider)
router.get('/subscription', customerController.subscription)
router.get('/products', customerController.products)
router.get('/Sign_In', customerController.signin)
router.post('/Sign_Up', customerController.signup)
router.get('/package', customerController.package)





module.exports = router;
