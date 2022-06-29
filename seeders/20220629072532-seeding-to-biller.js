'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require('../data/biller.json')
    data.forEach(el => {
      el.totalPay = el.fee + el.price
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Billers', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Billers', null, {})
  }
};
