var express = require('express');

var router = express.Router();

const { verifySignUp } = require('../service/index');

const TUTORIAL = require('../controllers/tutorial');
const USER_CONTROLLER = require('../controllers/auth/user');

/** GET home page */
router.get('/', (req, res) => {
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

router.use('/v1', require('./v1'));

function userSignUp(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post('/user/resgister', [
        verifySignUp.checkDuplicateEmail,
        verifySignUp.checkRolesExisted
    ],
        USER_CONTROLLER.signup
    );
    app.post('/user/login', USER_CONTROLLER.signin);
}

module.exports = {
    router,
    userSignUp
}