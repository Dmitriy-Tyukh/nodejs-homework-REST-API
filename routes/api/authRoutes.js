const express = require('express');

const checkAuth = require('../../middlewares/auth.middlewares');
const ctrAuth = require('../../controllers/authController');

const router = express.Router();

router.route('/register').post(checkAuth.checkSingupData, ctrAuth.singup);

router.route('/login').post(checkAuth.checkLoginData, ctrAuth.login);

router.use(checkAuth.protect);
router.route('/logout').post(ctrAuth.logout);
router.route('/current').get(ctrAuth.currentUser);
router.route('/').patch(checkAuth.subscription, ctrAuth.updateSubscription);

module.exports = router;
