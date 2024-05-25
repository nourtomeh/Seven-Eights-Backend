
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('phone').notNullable();
        table.string('gender').notNullable();
        table.date('birthdate').notNullable();
        table.string('university').notNullable();
        table.string('facebook_account').notNullable();
        table.string('type').notNullable();
        table.timestamps(true, true);
    });
};


exports.down = function (knex) {
    return knex.schema.dropTable('users');
};