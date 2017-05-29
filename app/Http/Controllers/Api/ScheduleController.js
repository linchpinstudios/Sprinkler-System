'use strict'

const Schedule = use('App/Model/Schedule')
const Sprinkler = use('App/Model/Sprinkler')
const moment = require('moment-timezone')
const Gpio = use('Adonis/Src/Gpio')

class ScheduleController {

  * index(request, response) {
    const schedules = yield Schedule.query().with('sprinklers').fetch()
    response.json( schedules )
  }

  * schedule(request, response) {
    const schedules = yield Schedule.query().where('enabled', 1).with('sprinklers').fetch()

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

    for( let i = 0; i < startStop.length; i++ ) {
      let sprinkler = yield Sprinkler.find(startStop[i].sprinkler)

      if( startStop[i].start == now && sprinkler.enabled ) {
        console.log('Starting: ', now, sprinkler.id)
        Gpio.on(sprinkler.pin)
      } else if ( startStop[i].end == now ) {
        console.log('Stopping: ', now, sprinkler.id)
        Gpio.off( sprinkler.pin )
      }
    }

    response.json( startStop )
  }

}

module.exports = ScheduleController
