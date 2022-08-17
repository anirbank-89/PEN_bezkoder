const { Validator } = require("node-input-validator");

const DB = require("../../models/index");
const CATEGORIES = DB.category;

const OP = DB.Sequelize.Op;

var create = async (req, res) => {
    const V = new Validator(req.body, {
        name: 'required',
        content: 'required'
    });
    let matched = await V.check().then(val => val);

    if (!matched) {
        return res.status(400).send({ status: false, errors: V.errors });
    }

    let saveData = {
        name: req.body.name,
        content: req.body.content
    }
    if (req.body.image != "" || req.body.image != null || typeof req.body.image != "undefined") {
        saveData.image = req.body.image;
    }

    CATEGORIES.create(saveData)
        .then(docs => {
            res.status(201).json({
                status: true,
                message: "New category created!",
                data: docs
            });
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                message: "Failed to save data. Server error.",
                error: err.message
            });
        });
}

var viewAll = async (req, res) => {
    await CATEGORIES.findAll({})
        .then(docs => {
            if (docs.length > 0) {
                res.status(200).json({
                    status: true,
                    message: "Data successfully get.",
                    data: docs
                });
            }
            else {
                res.status(200).json({
                    status: true,
                    message: "No categories created.",
                    data: []
                });
            }
        })
        .catch(err => {
            return res.status(500).json({
                status: false,
                message: "Server error. Please try again.",
                error: err.message
            });
        });
}

var update = async (req, res) => {
    const V = new Validator(req.body, {
        name: 'required',
        content: 'required'
    });
    let matched = await V.check().then(val => val);

    if (!matched) {
        return res.status(400).send({ status: false, errors: V.errors });
    }

    var id = req.params.id;
    
    CATEGORIES.update(
        req.body,
        { where: { id: id } }
    )
        .then(docs_num => {
            if (docs_num.length == 1) {
                res.status(201).json({
                    status: true,
                    message: "Data updated successfully.",
                    documents_modified: docs_num[0]
                });
            }
            else {
                res.status(404).send({
                    message: `Document with id ${id} not found.`
                });
            }
        })
        .catch(err => {
            res.status(501).json({
                status: false,
                message: "Invalid id. Server error.",
                error: err.message
            });
        });
}

var deleteCategory = async (req, res) => {
    var id = req.params.id;

    CATEGORIES.destroy({ where: { id: id } })
        .then(docs_num => {
            if (docs_num == 1) {
                res.status(200).json({
                    status: true,
                    message: "Data deleted successfully.",
                    documents_deleted: docs_num
                });
            }
            else {
                res.status(404).send({
                    message: `Document with id ${id} not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                message: "Invalid id. Server error.",
                error: err.message
            });
        })
}

module.exports = {
    create,
    viewAll,
    update,
    deleteCategory
}