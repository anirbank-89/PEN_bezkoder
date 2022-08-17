var passwordHash = require('password-hash');
const { Validator } = require('node-input-validator');
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');

const DB = require('../../models/index');
const ADMIN = DB.admin;

const OP = DB.Sequelize.Op;

/** ============== Utility functions ============== */
function comparePassword(candidatePassword, storedPassword) {
    return passwordHash.verify(candidatePassword, storedPassword);
}
/** =============================================== */

/** =============== API callbacks ================= */
var register = async (req, res) => {
    const V = new Validator(req.body, {
        fullname: 'required',
        email: 'required|email',
        password: 'required'     // |minLength: 8
    });
    let matched = await V.check().then(val => val);

    if (!matched) {
        return res.status(400).send({ status: false, errors: V.errors });
    }

    let saveData = {
        fullname: req.body.fullname,
        email: req.body.email,
        password: passwordHash.generate(req.body.password),
        token: uuidv4()
    }
    if (req.body.mobile != "" || req.body.mobile != null || typeof req.body.mobile != "undefined") {
        saveData.mobile = req.body.mobile;
    }
    if (req.body.address != "" || req.body.address != null || typeof req.body.address != "undefined") {
        saveData.address = req.body.address;
    }
    if (req.body.image != "" || req.body.image != null || typeof req.body.image != "undefined") {
        saveData.image = req.body.image;
    }
    console.log(saveData);

    // Save the data in database table
    ADMIN.create(saveData)
        .then(docs => {
            // console.log("Data ", docs);
            res.status(201).json({
                status: true,
                message: "Data saved successfully",
                data: docs
            });
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                message: "Server error. Please try again.",
                error: err.message
            });
        });
}

var login = async (req, res) => {
    const V = new Validator(req.body, {
        email: 'required|email',
        password: 'required'
    });
    let matched = await V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    let admin = await ADMIN.findAll({ where: { email: req.body.email } });

    if (admin.length == 0) {
        return res.status(500).json({
            status: false,
            error: "Invalid email.",
            data: null
        });
    }
    else {
        if (comparePassword(req.body.password, admin[0].password) === true) {
            return res.status(200).json({
                status: true,
                message: "Successful login.",
                data: admin[0]
            });
        }
        else {
            return res.status(500).json({
                status: false,
                error: "Invalid password.",
                data: null
            });
        }
    }
}

var getTokenData = async (token) => {
    let adminData = await ADMIN.findAll({ where: { token: token } });

    return adminData[0];
}
/** ============= API callbacks end =============== */

module.exports = {
    register,
    login,
    getTokenData
}