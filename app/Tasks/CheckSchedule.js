'use strict';

const Schedule = use('App/Model/Schedule')
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
    let now = moment.tz("America/Los_Angeles").format('hmm')
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

      console.log(sprinklerSchedule.start, now)
      if ( sprinklerSchedule.start == now ) {
        sprinkler = Sprinkler.find( sprinklerSchedule.sprinkler );
        console.log('Start Sprinkler:')
        console.log(sprinkler)
        if ( sprinkler.enabled ) Gpio.on(sprinklers.pin)
      } else if ( sprinklerSchedule.end == now ) {
        sprinkler = Sprinkler.find( sprinklerSchedule.sprinkler );
        Gpio.off(sprinklers.pin)
      }
    })
  }

}

module.exports = CheckSchedule;
