'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Balance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Balance.belongsTo(models.User, {
        foreignKey: 'UserId',
        targetKey: 'id'
      })
    }
  }
  Balance.init({
    UserId: DataTypes.INTEGER,
    balance: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `phone number is required`
        },
        notNull: {
          args: true,
          msg: `phone number can't be empty`
        },
        isNumeric: {
          args: true,
          msg: 'only number input to balance'
        },
        isInt: {
          args: true
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Balance',
  });
  return Balance;
};