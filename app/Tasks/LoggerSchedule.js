'use strict';

const Helpers = use('Helpers')
const moment = require('moment-timezone')

class LoggerSchedule {

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
