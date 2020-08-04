'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HostelTypeSchema extends Schema {
  up () {
    this.create('hostel_types', (table) => {
      table.increments()
      table.string('name').unique()
      table.string('slug').unique()      
      table.text('description').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('hostel_types')
  }
}

module.exports = HostelTypeSchema
