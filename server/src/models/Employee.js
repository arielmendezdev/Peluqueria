'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      Employee.belongsTo(models.Company, {as: 'company', foreignKey: 'company_id'});
      Employee.belongsTo(models.Local, {as: 'local', foreignKey: 'local_id'});
      
      Employee.hasMany(models.Turn, {as: 'turns', foreignKey: 'employee_id'});

      Employee.hasOne(models.Address, {as: 'address', foreignKey: 'employee_id'});
    }
  }
  Employee.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      photo: {
        type: DataTypes.STRING,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      local_id: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      company_id: {
        type: DataTypes.UUID,
        allowNull: false,
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
      modelName: "Employee",
    }
  );
  return Employee;
};