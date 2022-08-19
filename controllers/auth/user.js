const { Validator } = require("node-input-validator");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const db = require("../../models/index");
const config = require("../../config/auth.config");

const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

var signup = async (req,res) => {
    const V = new Validator(req.body, {
        firstName: 'required',
        lastName: 'required',
        email: 'required|email',
        password: 'required',   // |minLength:8
        country: 'required',
        currency: 'required'
    });
    let matched = await V.check().then(val => val);

    if (!matched) {
        return res.status(400).send({ status: false, errors: V.errors });
    }

    let saveData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        country: JSON.stringify(req.body.country),
        currency: JSON.stringify(req.body.currency)
    }
    if (req.body.city != "" || req.body.city != null || typeof req.body.city != "undefined") {
        saveData.city = req.body.city;
    }
    if (req.body.about != "" || req.body.about != null || typeof req.body.about != "undefined") {
        saveData.about = req.body.about;
    }
    if (req.body.include != "" || req.body.include != null || typeof req.body.include != "undefined") {
        saveData.include = req.body.include;
    }
    if (req.body.device_type != "" || req.body.device_type != null || typeof req.body.device_type != "undefined") {
        saveData.device_type = req.body.device_type;
    }
    if (req.body.image != "" || req.body.image != null || typeof req.body.image != "undefined") {
        saveData.image = req.body.image;
    }

    // Save user to database
    User.create(saveData)
        .then(docs => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: { [Op.or]: req.body.roles }
                    }
                })
                    .then(roles => {
                        docs.setRoles(roles)
                            .then(() => {
                                res.status(201).json({
                                    status: true,
                                    message: "User was registered successfully!",
                                    data: docs
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    status: false,
                                    message: "Server error 3. Please try again.",
                                    error: err.message
                                });
                            });
                    })
                    .catch(err => {
                        res.status(500).json({
                            status: false,
                            message: "Server error 2. Please try again.",
                            error: err.message
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                message: "Server error 1. Please try again.",
                error: err.message
            });
        });
}

var signin = async (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found."});
            }
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

            if (!passwordIsValid) {
                return res.status(401).send({ message: "Invalid password!" });
            }
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            var authorities = []

            user.getRoles().then(roles => {
                for (let i=0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).json({
                    status: true,
                    message: "Successful logged in!",
                    user_data: user,
                    roles: authorities,
                    accessToken: token
                });
            })
        })
        .catch(err => {});
}

module.exports = {
    signup,
    signin
}