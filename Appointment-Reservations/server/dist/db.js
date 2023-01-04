"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
// import {Provider,Patient,ProviderAvailability,PatientAppointment} from './models';
const { PORT, HOST, USER, PASSWORD, DB } = process.env;
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    host: "97.107.132.183",
    username: "david@97.107.132.183",
    password: "rgerggDFD275",
    database: "new",
    logging: false,
    //   models: [Patient,
    //            Provider,
    //            ProviderAvailability,
    //            PatientAppointment]
});
exports.default = sequelize;
//# sourceMappingURL=db.js.map