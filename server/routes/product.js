const express = require('express');
const router = express.Router();

const {requireSignin, isAdmin, isAuth} = require('../controllers/auth');
const {userById} = require('../controllers/user');
const {
    create,
    productById,
    read,
    remove,
    update,
    list,
    listCategories,
    listBySearch,
    photo,
    listRelated
} = require('../controllers/product');

router.post("/by/search", listBySearch);
router.post('/create/:userId', requireSignin, isAuth, isAdmin, create);
router.get('/:productId', read);
router.delete('/:productId/:userId', requireSignin, isAuth, isAdmin, remove);
router.put('/:productId/:userId', requireSignin, isAuth, isAdmin, update);
router.get('/', list);
router.get('/categories', listCategories);
router.get('/related/:productId', listRelated);
router.get('/photos/:productId', photo);

router.param('userId', userById);
router.param('productId', productById);


module.exports = router;