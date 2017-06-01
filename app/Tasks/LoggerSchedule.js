'use strict';

const Helpers = use('Helpers')
const moment = require('moment-timezone')

class LoggerSchedule {

  // This is required. This is the schedule for which the task will run.
  // More docs here: https://github.com/node-schedule/node-schedule#cron-style-scheduling
  static get schedule() {
    // once every minute
    return '* * * * *';
  }

  // This is the function that is called at the defined schedule
  * handle() {

    let now = parseInt(moment.tz("America/Los_Angeles").format('Hmm'))

    console.log('Schedule Check: ', now)

  }

}
