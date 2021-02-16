'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pokemon.belongsTo(models.User, { foreignKey: "userId" });
      Pokemon.belongsToMany(models.Team, {
        through: 'PlayerPokemon',
        foreignKey: 'pokemonId',
        otherKey: 'teamId'
      });
    }
  };
  Pokemon.init({
    name: DataTypes.STRING,
    img: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Pokemon',
  });
  return Pokemon;
};