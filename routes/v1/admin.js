var express = require('express');

var router = express.Router();

const CATEGORY_CONTROLLER = require('../../controllers/admin/Category');

router.get('/', function (req, res, next) {
    return res.send({
        status: false
    })
})

router.use((req, res, next) => {
    if (req.userType == "Admin") {
        next()
    } else {
        res.send({ status: false, msg: "parmison not found" })
    }
})

router.post('/category/Category', CATEGORY_CONTROLLER.create);
router.get('/category/Category', CATEGORY_CONTROLLER.viewAll);

module.exports = router;