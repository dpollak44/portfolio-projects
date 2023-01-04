import { Sequelize } from "sequelize-typescript";

// import {Provider,Patient,ProviderAvailability,PatientAppointment} from './models';

const { PORT, HOST, USER, PASSWORD, DB }:any = process.env;

const sequelize = new Sequelize({
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

export default sequelize;