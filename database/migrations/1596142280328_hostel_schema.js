'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HostelSchema extends Schema {
  up () {
    this.create('hostels', (table) => {
      table.increments()
      table.string('name').unique()
      table.string('email').unique()
      table.text('description').notNullable()
      table.string('slug').nullable()
      table.string('adress').nullable()
      table.string('latitude').nullable()
      table.string('longitude').nullable()
      table.string('locality').nullable()
      table.string('subAdministrativeArea').nullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('type_id').unsigned().references('id').inTable('hostel_types')
      table.timestamps()
    })
  }

  down () {
    this.drop('hostels')
  }
}

module.exports = HostelSchema
