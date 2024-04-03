'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Local extends Model {
    static associate(models) {
      Local.belongsTo(models.Company, { as: 'company', foreignKey: 'company_id' });

      Local.hasMany(models.Employee, { as: 'employees', foreignKey: 'local_id'});
      Local.hasMany(models.Turn, { as: 'turns', foreignKey: 'local_id'})

      Local.hasOne(models.Address, { as: 'address', foreignKey: 'local_id' });

    }
  }
  Local.init(
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
      phone: {
        type: DataTypes.STRING,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      modelName: "Local",
    }
  );
  return Local;
};