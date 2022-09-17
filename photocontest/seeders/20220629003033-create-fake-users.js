'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     * 
    */
    await queryInterface.bulkInsert('users', [{
        name: 'John Doe',
        email: 'john@email.com',
        uuid: '8d3f4ca5-40f1-477c-b487-c88e0ecf7b08',
        password: 'password',
        createdAt: "2022-06-28T23:44:06.573Z",
        updatedAt: "2022-06-29T00:25:14.585Z"
    },{
        name: 'Jane Doe',
        email: 'jane@email.com',
        uuid: '8d3f4ca5-40f1-477c-b487-c77e0ecf7b08',
        password: 'password',
        createdAt: "2022-06-28T23:44:06.573Z",
        updatedAt: "2022-06-29T00:25:14.585Z"
  }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
