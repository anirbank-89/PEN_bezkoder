module.exports = (sequelize, Sequelize) => {
    var Tutorial = sequelize.define("tutorial", {
        title: {
            type: Sequelize.STRING
            // required: true
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });

    return Tutorial;
}