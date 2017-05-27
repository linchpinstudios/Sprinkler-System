'use strict'

const Factory = use('Factory')
const Schedule = use('App/Model/Schedule')
const Sprinkler = use('App/Model/Sprinkler')
const Database = use('Database')

class ScheduleSeeder {

  * run () {
    yield Database.truncate('schedules')
    yield Database.truncate('schedule_sprinkler')

    const schedule = yield Schedule.create({
      start: 700,
      sunday: 1,
      tuesday: 1,
      friday: 1
    })

    const sprinklerIds = yield Sprinkler.ids()

    yield schedule.sprinklers().attach(sprinklerIds, {
      duration: 10
    })
  }

}

module.exports = ScheduleSeeder
