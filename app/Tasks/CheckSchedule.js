'use strict';

const Schedule = use('App/Model/Schedule')
const Moment = require('moment')

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

    schedules.forEach( () => {

    });
  }

}

module.exports = CheckSchedule;
