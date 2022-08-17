var express = require('express');

var router = express.Router();

var middleware = require('../../service/middleware').middleware;

var adminRoute = require('./admin');

const ADMIN_CONTROLLER = require('../../controllers/auth/admin');

/** ================================= without login url ================================= */
router.post('/admin/register', ADMIN_CONTROLLER.register);
router.post('/admin/login', ADMIN_CONTROLLER.login);
/** =============================== without login url end =============================== */

router.use(middleware);

router.use('/admin', adminRoute);

module.exports = router;