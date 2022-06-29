'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, {
        foreignKey: "UserId",
        targetKey: 'id'
      })
      Transaction.belongsTo(models.Biller, {
        foreignKey: "BillerId",
        targetKey: 'id'
      })
    }
  }
  Transaction.init({
    UserId: DataTypes.INTEGER,
    BillerId: DataTypes.INTEGER,
    isPaid: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  Transaction.beforeCreate((instance, options) => {
    instance.isPaid = false
  })
  return Transaction;
};