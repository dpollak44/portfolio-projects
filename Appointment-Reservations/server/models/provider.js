module.exports = (sequelize, Sequelize) => {
    const Provider = sequelize.define('provider',{
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
    return Provider;
}

