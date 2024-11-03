const { datatypes, model } = require("sequelize");
const { sequelize } = require("../service/database/db");

class Appliance extends model { }
Appliance.init(
    {
        id: {
            type: datatypes.integer,
            allownull: false,
            primarykey: true,
            autoincrement: true,
        },
        name: {
            type: datatypes.string,
            allownull: false,
        },
        watts: {
            type: datatypes.integer,
            allownull:false,
        },
        hours: {
            type: datatypes.string,
            allownull:false,
        }
    },
    {
        // other model options go here
        sequelize, // we need to pass the connection instance
        modelname: "appliances", // we need to choose the model name
    },
);

export default Appliance;
  