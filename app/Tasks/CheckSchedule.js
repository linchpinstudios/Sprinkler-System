'use strict';

const Schedule = use('App/Model/Schedule')
const Sprinkler = use('App/Model/Sprinkler')
const moment = require('moment-timezone')
const Gpio = use('Adonis/Src/Gpio')

class CheckSchedule {

  // This is required. This is the schedule for which the task will run.
  // More docs here: https://github.com/node-schedule/node-schedule#cron-style-scheduling
  static get schedule() {
    // once every minute
    return '*/1 * * * *';
  }

  // This is the function that is called at the defined schedule
  * handle() {
    const schedules = yield Schedule.query().with('sprinklers').fetch()

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
      let sprinkler;

      if ( sprinklerSchedule.start == now ) {
        sprinkler = Sprinkler.find( sprinklerSchedule.sprinkler );
        console.log('Start Sprinkler:', sprinkler.id)
        if ( sprinkler.enabled ) Gpio.on(sprinklers.pin)
      } else if ( sprinklerSchedule.end == now ) {
        sprinkler = Sprinkler.find( sprinklerSchedule.sprinkler );
        console.log('Stop Sprinkler:', sprinkler.id)
        Gpio.off(sprinklers.pin)
      }
    })
  }

}

module.exports = CheckSchedule;
