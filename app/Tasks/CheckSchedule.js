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
    return '* * * * *';
  }

  // This is the function that is called at the defined schedule
  * handle() {
    const schedules = yield Schedule.query().where('enabled', 1).with('sprinklers').fetch()

    let day = moment.tz("America/Los_Angeles").format('dddd')
    let now = parseInt(moment.tz("America/Los_Angeles").format('Hmm'))
    let runningToday = []
    let startStop = []
    let killAll = {};

    console.log('Checking: ', now)

    schedules.forEach((schedule) => {
      if ( schedule.enabled && schedule[day.toLowerCase()] ) {
        runningToday.push(schedule)
      }
    })

    runningToday.forEach((schedule) => {
      var lastTime = moment(schedule.start, 'Hmm')

      schedule.relations.sprinklers.forEach((sprinkler) => {
        startStop.push({
          sprinkler: sprinkler.id,
          start: parseInt(lastTime.format('Hmm')),
          end: parseInt(lastTime.add(sprinkler._pivot_duration, 'minute').format('Hmm'))
        })
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

  }

}

module.exports = CheckSchedule;
