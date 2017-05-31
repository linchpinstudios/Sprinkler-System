'use strict'

const Schema = use('Schema')

class AddStatusTableSchema extends Schema {

  up () {
    this.table('sprinklers', (table) => {
      table.boolean('running').defaultTo(false)
    })
  }

  down () {
    this.table('sprinklers', (table) => {
      table.dropColumn('running')
    })
  }

}

module.exports = AddStatusTableSchema
