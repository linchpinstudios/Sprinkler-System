'use strict'

const ServiceProvider = require('adonis-fold').ServiceProvider

class GpioProvider extends ServiceProvider {

  * register () {
    this.app.singleton('Adonis/Src/Gpio', function (app) {
      try {
        const Gpio = require('../app/src/Gpio')
        return new Gpio()
      } catch (e) {
        const GpioDev = require('../app/src/GpioDev')
        return new GpioDev()
      }
    })
  }
}

module.exports = GpioProvider
