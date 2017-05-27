'use strict'

const Schema = use('Schema')

class SchedulesTableSchema extends Schema {

  up () {
    this.create('schedules', (table) => {
      table.increments()
      table.integer('start')
      table.boolean('enabled').defaultTo(true)
      table.boolean('sunday').defaultTo(false)
      table.boolean('monday').defaultTo(false)
      table.boolean('tuesday').defaultTo(false)
      table.boolean('wednesday').defaultTo(false)
      table.boolean('thrusday').defaultTo(false)
      table.boolean('friday').defaultTo(false)
      table.boolean('saturday').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('schedules')
  }

}

module.exports = SchedulesTableSchema
