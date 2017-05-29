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
    const schedules = yield Schedule.query().where('enabled', 1).with('sprinklers').fetch()
    const sprinklers = yield Sprinkler.all()

    let day = moment.tz("America/Los_Angeles").format('dddd')
    let now = parseInt(moment.tz("America/Los_Angeles").format('Hmm'))
    let runningToday = []
    let startStop = []

    schedules.forEach((schedule) => {
      if ( schedule.enabled && schedule[day.toLowerCase()] ) {
        runningToday.push(schedule)
      }
    })

    runningToday.forEach((schedule) => {
      var lastTime = schedule.start

      schedule.relations.sprinklers.forEach((sprinkler) => {
        startStop.push({
          sprinkler: sprinkler.id,
          start: lastTime,
          end: lastTime + sprinkler._pivot_duration
        })
        lastTime = lastTime + sprinkler._pivot_duration
      })
    })

    startStop.forEach((sprinklerSchedule) => {
      console.log(sprinklers.find(sprinklerSchedule.sprinkler))
      if ( sprinklerSchedule.start == now ) {
        // if ( sprinkler.enabled ) Gpio.on(sprinklers.pin)
      } else if ( sprinklerSchedule.end == now ) {
        // Gpio.off( sprinklers.pin )
      }
    })
  }

}

module.exports = ScheduleController
