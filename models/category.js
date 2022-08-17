module.exports = (sequelize, Sequelize) => {
    var Category = sequelize.define("categories", {
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        content: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });

    return Category;
}