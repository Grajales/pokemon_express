'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
            name:'Tony Stark',
            username: 'ironman',
            password: 'pretty',
            teamId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name:'Clark Kent',
            username: 'superman',
            password: `canfly`,
            teamId: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name:'Bruce Wayne',
            username: 'batman',
            password: 'hascar',
            teamId: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ],
    {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
