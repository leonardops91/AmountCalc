
exports.up = function(knex) {
    return knex.schema.createTable('values', function(table){
    table.decimal('initValue').notNullable();
    table.decimal('intPerYear').notNullable();
    table.decimal('intPerMonth')
    table.decimal('periodPerYear').notNullable();
    table.decimal('periodPerMonth').notNullable();
    table.decimal('amount').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('values');
};
