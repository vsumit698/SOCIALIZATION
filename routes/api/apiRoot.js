const router = require('express').Router();

// path is /api...
router.use('/v1',require('./v1/api-v1'));

module.exports = router;