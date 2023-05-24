"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn("entries", { country: Sequelize.STRING })
    await queryInterface.addColumn("entries", { entryID: Sequelize.STRING })
    await queryInterface.addColumn("entries", {
      status: Sequelize.ENUM("passed", "not passed"),
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn("entries", { country: Sequelize.STRING })
    await queryInterface.removeColumn("entries", { entryID: Sequelize.STRING })
    await queryInterface.removeColumn("entries", {
      status: Sequelize.ENUM("passed", "not passed"),
    })
  },
}
