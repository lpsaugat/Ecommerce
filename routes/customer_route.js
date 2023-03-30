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
router.get('/Sign_Up', customerController.signup)

router.get('/package', customerController.package)
router.get('/familypackages', customerController.familypackages)
router.get('/singlepackage', customerController.singlepackage)
router.get('/cart', customerController.cart)
router.get('/Billing', customerController.billing)
router.get('/payments', customerController.payments)
router.get('/success', customerController.success)
router.get('/orderconfirmation', customerController.orderconfirmation)
router.get('/vendor', customerController.vendor)


router.get('/singleproduct', customerController.singleproduct)



router.get('/test', customerController.test)







module.exports = router;
