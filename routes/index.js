var express = require('express');

var router = express.Router();

const TUTORIAL = require('../controllers/tutorial');

/** GET home page */
router.get('/', (req,res)=>{
    // console.log("Website is live!");
    res.send("Hello Tutorial!");
});

router.post('/create', TUTORIAL.create);

module.exports = router;