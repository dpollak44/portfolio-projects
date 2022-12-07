module.exports = (sequelize, Sequelize) => {
    const ProviderAvailability = sequelize.define('provider_availability',{
        provider_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            primaryKey: true
        },
        start_time: {
            type: Sequelize.TIME,
            allowNull: false,
            primaryKey: true
        },
        end_time: {
            type: Sequelize.TIME,
            allowNull: false,
        }
    });
    return ProviderAvailability;
}