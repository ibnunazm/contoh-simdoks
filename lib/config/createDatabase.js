"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDatabase = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _sequelize = require("sequelize");
const sequelize = new _sequelize.Sequelize('mysql://root:@localhost:3306', {
  dialect: 'mysql'
});
const createDatabase = async () => {
  try {
    const [results] = await sequelize.query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'simdoks'");
    if (results.length === 0) {
      await sequelize.query('CREATE DATABASE simdoks');
      console.log('Database "simdoks" created successfully.');
    }
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    await sequelize.close();
  }
};
exports.createDatabase = createDatabase;