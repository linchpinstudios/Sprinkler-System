'use strict'

const Schedule = use('App/Model/Schedule')
const Sprinkler = use('App/Model/Sprinkler')
const moment = require('moment-timezone')

class ScheduleController {

  * index(request, response) {
    const schedules = yield Schedule.query().with('sprinklers').fetch()
    response.json( schedules )
  }

  * schedule(request, response) {
    const schedules = yield Schedule.query().with('sprinklers').fetch()

    let day = moment.tz("America/Los_Angeles").format('dddd')
    let now = moment.tz("America/Los_Angeles").format('hmm')
    let runningToday = []
    let startStop = []

    schedules.forEach((schedule) => {
      if ( schedule.enabled && schedule[day.toLowerCase()] ) {
        runningToday.push(schedule)
      }
    })

    runningToday.forEach((schedule) => {
      var lastTime = moment(schedule.start, 'hmm').tz("America/Los_Angeles")

      schedule.relations.sprinklers.forEach((sprinkler) => {
        console.log(schedule.start, lastTime)
        startStop.push({
          sprinkler: sprinkler.id,
          start: lastTime.clone().format('hmm'),
          end: lastTime.add(sprinkler._pivot_duration, 'minute').clone().format('hmm')
        })
      })
    })

    startStop.forEach((sprinklerSchedule) => {
      let sprinkler;
      if ( sprinklerSchedule.start == now ) {
        sprinkler = Sprinkler.find( sprinklerSchedule.sprinkler );
        sprinkler.turnOn()
      } else if ( sprinklerSchedule.end == now ) {
        sprinkler = Sprinkler.find( sprinklerSchedule.sprinkler );
        sprinkler.turnOff()
      }
    })

    response.json(startStop)
  }

}

module.exports = ScheduleController
