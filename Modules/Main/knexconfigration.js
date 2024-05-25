const knex = require('knex');
const knexconfig = require('../../knexfile');
const db = knex(knexconfig);

module.exports = db ;