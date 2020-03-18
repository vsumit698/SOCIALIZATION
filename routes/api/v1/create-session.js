const router = require('express').Router();
const sessionApi = require('../../../controllers/apiControllers/v1/create-session_api');
// path is /api/v1/create-session

router.post('/',sessionApi.createApiSession);

module.exports = router;