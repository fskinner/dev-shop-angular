var express         = require('express');
var router          = express.Router();
var cartController  = require('./controllers/cartController');

router.get('/', cartController.get);
router.post('/', cartController.post);
router.delete('/:id', cartController.delete);
router.delete('/', cartController.wipe);

module.exports = router;
