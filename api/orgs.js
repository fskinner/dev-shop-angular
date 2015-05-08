var express       = require('express');
var router        = express.Router();
var orgController = require('./controllers/orgController');

router.get('/:org/users', orgController.get);

module.exports = router;
