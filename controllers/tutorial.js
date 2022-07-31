const DB = require('../models/index');
const TUTORIAL = DB.tutorial;
const OP = DB.Sequelize.Op;

var createTutorial = async (req,res) => {
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
        .then(data => {
            res.status(201).json({
                status: true,
                message: "Data saved successfully.",
                data: data
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

var findAll = async (req,res) => {}

var findOne = async (req,res) => {}

var update = async (req,res) => {}

var deleteTutorial = async (req,res) => {}

var deleteAll = async (req,res) => {}

var findAllPublished = async (req,res) => {}

module.exports = {
    createTutorial,
    findAll,
    findOne,
    update,
    deleteTutorial,
    deleteAll,
    findAllPublished
}