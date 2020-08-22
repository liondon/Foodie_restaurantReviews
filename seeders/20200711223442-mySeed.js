'use strict';
const bcrypt = require('bcryptjs')
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      email: 'root@example.com',
      password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
      isAdmin: true,
      name: 'root',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'user1@example.com',
      password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
      isAdmin: false,  // defaultValue will not be used! 
      name: 'user1',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'user2@example.com',
      password: bcrypt.hashSync('user', bcrypt.genSaltSync(10), null),
      isAdmin: false,
      name: 'user2',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})

    await queryInterface.bulkInsert('Categories', ['中式料理', '日本料理', '義大利料理', '墨西哥料理', '素食料理', '美式料理', '複合式料理'].map((item, i) => ({
      id: i + 1,
      name: item,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    ), {})

    await queryInterface.bulkInsert('Restaurants',
      Array.from({ length: 50 }).map(d => ({
        name: faker.name.findName(),
        tel: faker.phone.phoneNumber(),
        addr: faker.address.streetAddress(),
        open_hours: '08:00',
        image: `https://loremflickr.com/320/240/restaurant,food/?random=${Math.random() * 100}`,
        desc: faker.lorem.text(),
        CategoryId: Math.floor(Math.random() * 5) + 1,
        createdAt: new Date(),
        updatedAt: new Date()
      })), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkDelete('Categories', null, {})
    await queryInterface.bulkDelete('Restaurants', null, {})
  }
};
