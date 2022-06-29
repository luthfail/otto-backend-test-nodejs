'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Biller extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Biller.hasMany(models.Transaction, {
        foreignKey: 'BillerId',
        targetKey: 'id'
      })
    }
  }
  Biller.init({
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `category is required`
        },
        notNull: {
          args: true,
          msg: `category can't be empty`
        }
      }
    },
    product: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `product is required`
        },
        notNull: {
          args: true,
          msg: `product can't be empty`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `description is required`
        },
        notNull: {
          args: true,
          msg: `description can't be empty`
        }
      }
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `price is required`
        },
        notNull: {
          args: true,
          msg: `price can't be empty`
        },
        isNumeric: {
          args: true,
          msg: 'input number only'
        }
      }
    },
    fee: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `fee is required`
        },
        notNull: {
          args: true,
          msg: `fee can't be empty`
        },
        isNumeric: {
          args: true,
          msg: 'input number only'
        }
      }
    },
    totalPay: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `totalPay is required`
        },
        notNull: {
          args: true,
          msg: `totalPay can't be empty`
        },
        isNumeric: {
          args: true,
          msg: 'input number only'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Biller',
  });
  Biller.beforeCreate((instance, options) => {
    instance.totalPay = instance.fee + instance.price
  })
  return Biller;
};