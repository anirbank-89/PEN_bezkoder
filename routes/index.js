var express = require('express');

var router = express.Router();

const TUTORIAL = require('../controllers/tutorial');

/** GET home page */
router.get('/', (req,res)=>{
    // console.log("Website is live!");
    res.send("Hello Tutorial!");
});

router.post('/tutorials', TUTORIAL.createTutorial);
router.get('/tutorials', TUTORIAL.findAll);
router.get('/tutorials/:id', TUTORIAL.findOne);
router.put('/tutorials/:id', TUTORIAL.editTutorial);
router.delete('/tutorials/:id', TUTORIAL.deleteTutorial);
router.delete('/tutorials', TUTORIAL.deleteAll);

router.get('/published-tutorials', TUTORIAL.findAllPublished);

module.exports = router;