module.exports = (sequelize, Sequelize) => {
    var Admin = sequelize.define("admins", {
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        mobile: {
            type: Sequelize.BIGINT,
            unique: true
        },
        address: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        admin_type: {
            type: Sequelize.STRING,
            defaultValue: "Admin"
        },
        token: {
            type: Sequelize.STRING
        },
        fullname: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });

    return Admin;
}