module.exports = (sequelize, Sequelize) => {
    var Tutor = sequelize.define("tutors", {
        name: {
            type: Sequelize.STRING
            // required: true
        },
        specialization: {
            type: Sequelize.STRING
        }
    });

    return Tutor;
}