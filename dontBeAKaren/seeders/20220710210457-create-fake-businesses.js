'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Businesses', [{
      name: 'John Does Paint Store',
      stars: 5,
      picture: null,
      hours: '8-5',
      phone: '1234567890',
      website: 'joes@joes.com',
      reviews: 'its good',
      menu: null,
      createdAt: "2022-03-13T20:54:10.809Z",
      updatedAt: "2022-03-13T20:54:10.809Z"
    }],
  )},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Businesses', null, {});
    
  }
};
