'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.belongsTo(models.Team, { foreignKey: 'teamId' })
      User.belongsToMany(models.Pokemon, {
        through: 'PlayerPokemon',
        foreignKey: 'userId',
        otherKey: 'pokemonId'
      });
    }
  };
  User.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    teamId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};