'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SterilizationSchema extends Schema {
  up () {
    this.create('sterilizations', (table) => {
      table.increments()
      table.string('name').unique()
      table.string('slug').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('sterilizations')
  }
}

module.exports = SterilizationSchema
