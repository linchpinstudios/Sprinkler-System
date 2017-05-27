'use strict'

const Lucid = use('Lucid')
const five = require('johnny-five');
const chipio = require('chip-io');

class Sprinkler extends Lucid {

  schedules() {
    return this.belongsToMany('App/Model/Schedule', 'schedule_sprinkler').withPivot('duration')
  }

  setupGpio() {
    return new Promise(resolve => {
      if (this.board) resolve()
      this.board = new five.Board({
        io: new chipio()
      });
      this.board.on('ready', () => {
        resolve()
      })
    })
  }

  turnOn() {
    this.setupGpio()
    this.gpio.write(1)
  }

  turnOff() {
    this.setupGpio()
    this.gpio.write(1)
  }

  status() {
    this.setupGpio()
    return this.gpio.read()
  }

}

module.exports = Sprinkler
