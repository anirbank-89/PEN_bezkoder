const DB = require('../models/index');
const ROLES = DB.ROLES;
const USER = DB.user;

async function checkDuplicateEmail(req, res, next) {
    await USER.findOne({ where: { email: req.body.email } })
        .then(docs => {
            if (docs) {
                return res.status(400).json({
                    message: "Email already exists."
                });
                return;
            }
            next();
        });
}

async function checkRolesExisted(req, res, next) {
    if (req.body.roles.length > 0) {
        for (let i=0; i < req.body.roles.length > 0; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Role of ${req.body.roles[i]} does not exist.`
                });
                return;
            }
        }
    }

    next();
}

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail,
    checkRolesExisted: checkRolesExisted
}

module.exports = verifySignUp;