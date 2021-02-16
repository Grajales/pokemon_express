'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
    "Pokemons", [
      {
        name: "Bulbasaur",
        img: "http://img.pokemondb.net/artwork/bulbasaur.jpg"
      },
      {
        name: "Ivysaur",
        img: "http://img.pokemondb.net/artwork/ivysaur.jpg",
        userId: 1
      },
      {
        name: "Venusaur",
        img: "http://img.pokemondb.net/artwork/venusaur.jpg"
      },
      {
        name: "Charmander",
        img: "http://img.pokemondb.net/artwork/charmander.jpg",
        userId: 2
      },
      {
        name: "Charizard",
        img: "http://img.pokemondb.net/artwork/charizard.jpg",
        userId: 3
      },
      {
        name: "Squirtle",
        img: "http://img.pokemondb.net/artwork/squirtle.jpg",
        userId: 1
      },
      {
        name: "Wartortle",
        img: "http://img.pokemondb.net/artwork/wartortle.jpg",
        userId: 2
      },
    ],
    {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
