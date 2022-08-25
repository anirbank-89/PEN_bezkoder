module.exports = (sequelize, Sequelize) => {
    var User = sequelize.define("users", {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
            // defaultValue: [],
            // get: function () {
            //     return this.getDataValue('country').split(',');    // JSON.parse(this.getDataValue('country'))
            // },
            // set: function (val) {
            //     return this.setDataValue('country', val.join(','));// this.setDataValue('myArrayField', JSON.stringify(val));
            // }
        },
        city: {
            type: Sequelize.STRING
        },
        currency: {
            type: Sequelize.STRING
        },
        about: {
            type: Sequelize.STRING
        },
        include: {
            type: Sequelize.STRING
            // defaultValue: [],
            // get: function () {
            //     return this.getDataValue('include').split(',');    // JSON.parse(this.getDataValue('country'))
            // },
            // set: function (val) {
            //     return this.setDataValue('include', val.join(','));// this.setDataValue('myArrayField', JSON.stringify(val));
            // }
        },
        // token: {
        //     type: Sequelize.STRING,
        //     unique: true
        // },
        // type: {
        //     type: Sequelize.STRING,
        //     defaultValue: 'User'
        // },
        device_type: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        block: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        priority: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        seller_request: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        seller_approval: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    return User;
}