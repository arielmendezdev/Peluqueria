'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      Address.belongsTo(models.Employee, {as: 'employee', foreignKey: 'id'});
      Address.belongsTo(models.Local, {as: 'local', foreignKey: 'id'});
    }
  }
  Address.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      streetName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      number: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      province: {
        type: DataTypes.STRING,
      },
      postCode: {
        type: DataTypes.INTEGER,
      },
      local_id: {
        type: DataTypes.UUID,
      },
      employee_id: {
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
      modelName: "Address",
    }
  );
  return Address;
};