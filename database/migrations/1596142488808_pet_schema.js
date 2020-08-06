'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PetSchema extends Schema {
  up () {
    this.create('pets', (table) => {
      table.increments()
      table.string('name').unique()
      table.string('slug').nullable()
      table.integer('age')
      table.enu('gender', ['male','female']).defaultTo('male')
      table.string('adress').nullable()
      table.string('latitude').nullable()
      table.string('longitude').nullable()
      table.string('locality').nullable()
      table.string('image').nullable()
      table.string('thumb').nullable()
      table.string('subAdministrativeArea').nullable()
      table.text('description').notNullable()

      table.integer('hostel_id').unsigned().references('id').inTable('hostels')
      table.integer('variety_id').unsigned().references('id').inTable('varieties')
      table.integer('state_id').unsigned().references('id').inTable('states')
      table.integer('size_id').unsigned().references('id').inTable('sizes')
      table.integer('sterilization_id').unsigned().references('id').inTable('sterilizations')
      table.timestamps()
    })
  }

  down () {
    this.drop('pets')
  }
}

module.exports = PetSchema
