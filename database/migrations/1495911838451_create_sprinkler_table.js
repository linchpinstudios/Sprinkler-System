'use strict'

const Schema = use('Schema')

class SprinklersTableSchema extends Schema {

  up () {
    this.create('sprinklers', (table) => {
      table.increments()
      table.string('name')
      table.string('pin')
      table.boolean('enabled').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('sprinklers')
  }

}

module.exports = SprinklersTableSchema
