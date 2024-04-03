'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Acomp extends Model {
    static associate(models) {
      Acomp.belongsTo(models.Client, { as: 'client', foreignKey: 'client_id' });
      Acomp.hasMany(models.Turn, { as: "turns", foreignKey: "acomp_id" });
    }
  }
  Acomp.init(
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
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      client_id: {
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
      modelName: "Acomp",
    }
  );
  return Acomp;
};