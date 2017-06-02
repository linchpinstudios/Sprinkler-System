'use strict'

const Schema = use('Schema')

class RenameThursdayTableSchema extends Schema {

  up () {
    this.table('schedules', (table) => {
      table.rename('thrusday', 'thursday')
    })
  }

  down () {
    this.table('schedules', (table) => {
      table.rename('thursday', 'thrusday')
    })
  }

}

module.exports = RenameThursdayTableSchema
