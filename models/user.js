'use strict';
const { hashPassword } = require('../helper');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Balance, {
        foreignKey: 'UserId',
        targetKey: 'id'
      })
      User.hasMany(models.Transaction, {
        foreignKey: 'UserId',
        targetKey: 'id'
      })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'username already exsist'
      }, 
      validate: {
        notEmpty: {
          args: true,
          msg: `username is required`
        },
        notNull: {
          args: true,
          msg: `username can't be empty`
        }
      }
    },
    email:  {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'email already exsist'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: `email is required`
        },
        notNull: {
          args: true,
          msg: `email can't be empty`
        },
        isEmail: {
          args: true,
          msg: `email is not valid`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `password is required`
        },
        notNull: {
          args: true,
          msg: `password can't be empty`
        },
        len:{
          args: [5, 32],
          msg: `password length must be between 5 and 32`
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'phone number already exsist'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: `phone number is required`
        },
        notNull: {
          args: true,
          msg: `phone number can't be empty`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, options) => {
    instance.password = hashPassword(instance.password);
  })
  return User;
};