'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('admins', [
      {
        userName: 'Dinsha',
        phoneNumber: 9061216414,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: 'Sandra',
        phoneNumber: 6282960646,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
