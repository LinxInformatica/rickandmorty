const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("user_favorite", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            },
        },
        favoriteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Favorite',
                key: 'id'
            }
        }
    }, { timestamps: false });
};