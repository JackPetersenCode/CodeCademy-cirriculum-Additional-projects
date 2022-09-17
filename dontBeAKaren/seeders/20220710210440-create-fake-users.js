'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      username: 'John Doe',
      email: "john@email.com",
      password: 'password',
      createdAt: "2022-03-13T20:54:10.809Z",
      updatedAt: "2022-03-13T20:54:10.809Z"
    }],
  )},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    
  }
};
