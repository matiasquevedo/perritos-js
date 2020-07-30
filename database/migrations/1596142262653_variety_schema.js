'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VarietySchema extends Schema {
  up () {
    this.create('varieties', (table) => {
      table.increments()
      table.string('name').unique()
      table.string('slug').unique()
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.timestamps()
    })
  }

  down () {
    this.drop('varieties')
  }
}

module.exports = VarietySchema
