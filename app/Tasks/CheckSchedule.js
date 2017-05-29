'use strict';

const Schedule = use('App/Model/Schedule')
const moment = require('moment-timezone')

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
        if ( sprinkler.enabled ) sprinkler.turnOn()
      } else if ( sprinklerSchedule.end == now ) {
        sprinkler = Sprinkler.find( sprinklerSchedule.sprinkler );
        sprinkler.turnOff()
      }
    })

    response.json(startStop)
  }

}

module.exports = CheckSchedule;
