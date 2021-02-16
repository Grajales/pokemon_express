'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
 
    static associate(models) {
      Team.hasMany(models.User, { foreignKey: 'teamId' })
    }
  };
  Team.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};