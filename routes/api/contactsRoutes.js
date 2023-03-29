const express = require('express');
const ctrContact  = require('../../controllers/contactController');
const checkContact = require('../../middlewares/contactMiddlewares');
const { protect } = require('../../middlewares/auth.middlewares');

const router = express.Router();

router.use(protect);
router.use('/:id', checkContact.id);

router.route('/')
  .get(ctrContact.get)
  .post(checkContact.createBody, ctrContact.create);
  
router.route('/:id')
  .get(ctrContact.getById)
  .delete(ctrContact.delete)
  .put(checkContact.updateBody, ctrContact.update);
  
router.route('/:id/favorite')
  .patch(checkContact.id, checkContact.status, ctrContact.updateStatus);

module.exports = router;
