'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SizeSchema extends Schema {
  up () {
    this.create('sizes', (table) => {
      table.increments()
      table.string('name').unique()
      table.string('slug').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('sizes')
  }
}

module.exports = SizeSchema
