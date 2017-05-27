'use strict'

const Schema = use('Schema')

class ScheduleSprinklerTableSchema extends Schema {

  up () {
    this.create('schedule_sprinkler', (table) => {
      table.increments()
      table.integer('duration')
      table.integer('sprinkler_id')
      table.integer('schedule_id')
    })
  }

  down () {
    this.drop('schedule_sprinkler')
  }

}

module.exports = ScheduleSprinklerTableSchema
