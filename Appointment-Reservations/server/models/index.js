const { Sequelize } = require('sequelize');
const sequelize = require('../db.js');

(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
    await sequelize.sync({ force: true })
})();

const Patient = require('./patient')(sequelize, Sequelize);
const Provider = require('./provider')(sequelize, Sequelize);
const ProviderAvailability = require('./providerAvailability')(sequelize, Sequelize);
const PatientAppointment = require('./patientAppointment')(sequelize, Sequelize);

module.exports = {
    Patient,
    Provider,
    ProviderAvailability,
    PatientAppointment
}