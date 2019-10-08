'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Food', [{
        name: 'Banana',
        calories: 150,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Apple',
        calories: 95,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kumquat',
        calories: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'String Cheese',
        calories: 80,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Black Coffee',
        calories: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Plain Bagel',
        calories: 245,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Steak',
        calories: 679,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Milk',
        calories: 103,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Yogurt',
        calories: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vanilla Ice Cream',
        calories: 137,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Food', null, {});
  }
};
