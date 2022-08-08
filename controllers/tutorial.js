const { Op } = require('sequelize');
const DB = require('../models/index');
const TUTORIAL = DB.tutorial;
const OP = DB.Sequelize.Op;

var createTutorial = async (req, res) => {
    // Validate request
    if (!req.body.title || !req.body.description) {
        res.status(400).send({
            message: "Title and content can not be empty!"
        });
        return;
    }
    // Create a tutorial data
    let saveData = {
        title: req.body.title,
        description: req.body.description
    }
    if (req.body.published != null || typeof req.body.published != "undefined") {
        saveData.published = req.body.published;
    }

    // Save the data in database table
    TUTORIAL.create(saveData)
        .then(docs => {
            res.status(201).json({
                status: true,
                message: "Data saved successfully.",
                data: docs
            });
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                message: "Server error. Failed to save data.",
                error: err.message
            });
        })
}

// Retrieve all Tutorials from the database.
var findAll = async (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : "";

    await TUTORIAL.findAll({ where: condition })
        .then(docs => {
            res.status(200).json({
                status: true,
                message: "Data successfully get.",
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

// Find a single Tutorial with an id
var findOne = async (req, res) => {
    var id = req.params.id;

    await TUTORIAL.findByPk(id)
        .then(docs => {
            if (docs == null || typeof docs == "undefined") {
                res.status(404).send({
                    message: `Cannot find Tutorial with id=${id}.`
                });
            }
            else {
                res.status(200).json({
                    status: true,
                    message: "Data successfully get.",
                    data: docs
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                message: "Invalid id. Server error.",
                error: err.message
            });
        });
}

// Update a Tutorial by the id in the request
var editTutorial = async (req, res) => {
    // Validate request
    if (!req.body.title || !req.body.description) {
        res.status(400).send({
            message: "Title and content can not be empty!"
        });
        return;
    }

    var id = req.params.id;

    TUTORIAL.update(
        req.body,
        { where: { id: id } }
    )
        .then(docs_num => {
            if (docs_num == 1) {
                res.status(201).json({
                    status: true,
                    message: "Data updated successfully.",
                    documents: docs_num[0]
                });
            }
            else {
                res.status(404).send({
                    message: `Document with id ${id} not found.`
                })
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

// Delete a Tutorial with the specified id in the request
var deleteTutorial = async (req, res) => {
    var id = req.params.id;

    TUTORIAL.destroy({ where: { id: id } })
        .then(docs_num => {
            if (docs_num == 1) {
                res.status(200).json({
                    message: "Data successfully deleted",
                    documents: docs_num[0]
                });
            }
            else {
                res.status(404).send({
                    message: `Data with id ${id} not found.`
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

// Delete all Tutorials from the database.
var deleteAll = async (req, res) => {
    TUTORIAL.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });
}

var findAllPublished = async (req, res) => {
    TUTORIAL.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
}

module.exports = {
    createTutorial,
    findAll,
    findOne,
    editTutorial,
    deleteTutorial,
    deleteAll,
    findAllPublished
}