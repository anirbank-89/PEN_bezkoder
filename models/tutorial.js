module.exports = (sequelize, Sequelize) => {
    var Tutorial = sequelize.define("tutorials", {
        title: {
            type: Sequelize.STRING
            // required: true
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    return Tutorial;
}