"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientAppointment = exports.ProviderAvailability = exports.Provider = exports.Patient = void 0;
const db_1 = __importDefault(require("../db"));
const patient_1 = require("./patient");
Object.defineProperty(exports, "Patient", { enumerable: true, get: function () { return patient_1.Patient; } });
const provider_1 = require("./provider");
Object.defineProperty(exports, "Provider", { enumerable: true, get: function () { return provider_1.Provider; } });
const providerAvailability_1 = require("./providerAvailability");
Object.defineProperty(exports, "ProviderAvailability", { enumerable: true, get: function () { return providerAvailability_1.ProviderAvailability; } });
const patientAppointment_1 = require("./patientAppointment");
Object.defineProperty(exports, "PatientAppointment", { enumerable: true, get: function () { return patientAppointment_1.PatientAppointment; } });
db_1.default.addModels([patient_1.Patient, provider_1.Provider, providerAvailability_1.ProviderAvailability, patientAppointment_1.PatientAppointment]);
// const sequelize = new Sequelize({
//   dialect: "mysql",
//   host: "97.107.132.183",
//   username: "david@97.107.132.183",
//   password: "rgerggDFD275",
//   database: "new",
//   logging: false,
//   models: [Patient,
//            Provider,
//            ProviderAvailability,
//            PatientAppointment]
// });
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    yield db_1.default.sync();
    // await sequelize.sync({ force: true })
}))();
//# sourceMappingURL=index.js.map