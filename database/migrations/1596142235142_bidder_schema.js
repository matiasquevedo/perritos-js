'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BidderSchema extends Schema {
  up () {
    this.create('bidders', (table) => {
      table.increments()
      table.string('name').unique()
      table.string('email').unique()
      table.string('description').notNullable()
      table.string('slug').nullable()
      table.string('adress').nullable()
      table.string('latitude').nullable()
      table.string('longitude').nullable()
      table.string('locality').nullable()
      table.string('subAdministrativeArea').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('bidders')
  }
}

module.exports = BidderSchema
