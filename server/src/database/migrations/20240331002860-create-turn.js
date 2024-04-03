'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Turns", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
      day: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      description: {
        type: Sequelize.STRING,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
      },
      local_id: {
        type: Sequelize.UUID,
        references: {
          model: "Locals",
          key: "id",
        },
      },
      employee_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Employees',
          key: 'id'
        }
      },
      client_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Clients',
          key: 'id'
        }
      },
      acomp_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Acomps',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Turns');
  }
};