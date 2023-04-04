const express = require('express');

const checkAuth = require('../../middlewares/authMiddlewares');
const ctrAuth = require('../../controllers/authController');
const ctrUser = require('../../controllers/userController');
const { upload, checkEmail } = require('../../middlewares/usersMiddlewares');

const router = express.Router();

router.route('/register').post(checkAuth.checkSingupData, ctrAuth.signup);

router.route('/verify/:verificationToken').get(ctrUser.verifyToken);
router.route('/verify').post(checkEmail, ctrUser.resendingEmail);

router.route('/login').post(checkAuth.checkLoginData, ctrAuth.login);


router.use(checkAuth.protect);
router.route('/').patch(checkAuth.subscription, ctrUser.updateSubscription);
router.route('/logout').post(ctrAuth.logout);

router.route('/current').get(ctrUser.currentUser);
router.route('/avatars').patch(upload.single('avatar'), ctrUser.updateAvatar);



module.exports = router;
