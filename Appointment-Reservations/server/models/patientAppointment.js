module.exports = (sequelize, Sequelize) => {
    const PatientAppointment = sequelize.define('patient_appointment',{
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            unique: true,
            defaultValue: Sequelize.UUIDV4
        },
        patient_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },
        provider_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
            primaryKey: true
        },
        time: {
            type: Sequelize.TIME,
            allowNull: false,
            primaryKey: true
        },
        confirmed: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
    return PatientAppointment;
}