const { datatypes, model } = require("sequelize");
const { sequelize } = require("../service/database/db");

class usermodel extends model { }
usermodel.init(
    {
        id: {
            type: datatypes.integer,
            allownull: false,
            primarykey: true,
            autoincrement: true,
        },
        username: {
            type: datatypes.string,
            allownull: false,
        },
        contact_number: {
            type: datatypes.string,
            allownull:false,
        },
        email: {
            type: datatypes.string,
            allownull:false,
        },
        account_type: {
            type: datatypes.string,
            allownull:false,
            defaultvalue: "user",
        },
        password: {
            type: datatypes.string,
            allownull:false,
        },
        salt: {
            type: datatypes.string,
            allownull:false,
        },
        createdat: {
            type: datatypes.date,
            allownull: false,
            defaultvalue: datatypes.now,
        },
        updatedat: {
            type: datatypes.date,
            allownull: false,
            defaultvalue: datatypes.now,
        },
    },
    {
        // other model options go here
        sequelize, // we need to pass the connection instance
        modelname: "users", // we need to choose the model name
    },
);

module.exports = usermodel;