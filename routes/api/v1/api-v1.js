const router = require('express').Router();

// path is /api/v1...
router.use('/post',require('./post'));
router.use('/create-session',require('./create-session'));

module.exports = router;