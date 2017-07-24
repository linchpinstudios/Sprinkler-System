'use strict'

const ServiceProvider = require('adonis-fold').ServiceProvider

class GpioProvider extends ServiceProvider {

  * register () {
    this.app.singleton('Adonis/Src/Gpio', function (app) {
      const Gpio = require('../app/src/Gpio')
      return new Gpio()
    })
  }
}

module.exports = GpioProvider
