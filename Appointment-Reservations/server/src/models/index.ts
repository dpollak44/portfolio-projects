import sequelize from '../db';
import { Sequelize } from "sequelize-typescript";
import { Patient } from "./patient";
import { Provider } from "./provider";
import { ProviderAvailability } from "./providerAvailability";
import { PatientAppointment } from "./patientAppointment";

sequelize.addModels([Patient, Provider, ProviderAvailability, PatientAppointment]);

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

(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
    await sequelize.sync();
    // await sequelize.sync({ force: true })
})();

export {
    Patient,
    Provider,
    ProviderAvailability,
    PatientAppointment
}
