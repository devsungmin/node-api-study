'use struct';

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('User', {
        username:{
            allowNull: false,
            unique: true,
            type: DataTypes.STRING
        },
        password:{
            allowNull: false,
            type: DataTypes.STRING
        },
        email:{
            allowNull: false,
            unique: true,
            type: DataTypes.STRING
        }
    },{});

    return user;
}