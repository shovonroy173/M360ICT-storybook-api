exports.up = function (knex) {
    return knex.schema
      .createTable('authors', (table) => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.text('bio')
        table.date('birthdate').notNullable()
      })
      .createTable('books', (table) => {
        table.increments('id').primary()
        table.string('title').notNullable()
        table.text('description')
        table.date('published_date').notNullable()
        table.integer('author_id').unsigned().references('id').inTable('authors').onDelete('CASCADE')
      })
  }
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('books').dropTableIfExists('authors')
  }
  