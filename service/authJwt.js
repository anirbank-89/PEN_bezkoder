var jwt = require("jsonwebtoken");
var config = require("../config/auth.config");
var db = require("../models/index");

var User = db.user;

async function verifyToken(req, res, next) {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided."
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Access unauthorized!"
            });
        }

        req.userId = decoded.id;
    });
}

async function isSeller(req, res, next) {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "Seller") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Seller Role!"
            });
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isSeller: isSeller
};

module.exports = authJwt;