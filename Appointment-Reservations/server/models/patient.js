module.exports = (sequelize, Sequelize) => {
    const Patient = sequelize.define('patient',{
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Patient;
}

