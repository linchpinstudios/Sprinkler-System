'use strict'

const Schema = use('Schema')

class RenameThursdayTableSchema extends Schema {

  up () {
    this.table('schedules', (table) => {
      table.renameColumn('thrusday', 'thursday')
    })
  }

  down () {
    this.table('schedules', (table) => {
      table.renameColumn('thursday', 'thrusday')
    })
  }

}

module.exports = RenameThursdayTableSchema
