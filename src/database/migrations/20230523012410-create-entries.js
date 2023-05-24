"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("entries", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      project: {
        type: Sequelize.STRING,
      },
      season: {
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "id",
        },
      },
      parentCategory: {
        type: Sequelize.ENUM(
          "AI Impact Creator",
          "AI Impact Shaper",
          "Best Practices for AI Skilling"
        ),
      },
      category: {
        type: Sequelize.ENUM(
          "13 - 18 Years",
          "Above 18 Years",
          "Academic Institutions",
          "Goverment Partners",
          "Implementation Partners"
        ),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("entries")
  },
}
