'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Turn extends Model {
    static associate(models) {
      Turn.belongsTo(models.Local, { as: 'local', foreignKey: 'local_id'})
      Turn.belongsTo(models.Employee, { as: 'employee', foreignKey: 'employee_id'})
      Turn.belongsTo(models.Client, { as: 'client', foreignKey: 'client_id'})
      Turn.belongsTo(models.Acomp, { as: 'acomp', foreignKey: 'acomp_id'})
      Turn.belongsTo(models.Service, { as: "service", foreignKey: "service_id" });
    }
  }
  Turn.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      day: {
        allowNull: false,
        type: DataTypes.DATE,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
      },
      local_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      employee_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      client_id: {
        type: DataTypes.UUID,
      },
      acomp_id: {
        type: DataTypes.UUID,
      },
      service_id: {
        type: DataTypes.UUID,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Turn",
    }
  );
  return Turn;
};