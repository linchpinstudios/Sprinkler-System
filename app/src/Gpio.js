'use strict'

const five = require('johnny-five');
const chipio = require('chip-io');

class Gpio {

  constructor() {

    this.pins = []

    this.board = new five.Board({
      io: new chipio(),
      pins: [
        {value: 1, pin: 'XIO-P0'},
        {value: 1, pin: 'XIO-P1'},
        {value: 1, pin: 'XIO-P2'},
        {value: 1, pin: 'XIO-P3'},
        {value: 1, pin: 'XIO-P4'},
        {value: 1, pin: 'XIO-P5'},
      ]
    });
  }

  getPin( pin ) {
    if ( this.pins[pin] ) return this.pins[pin]

    this.pins[pin] = new five.Led(pin)

    return this.pins[pin]
  }

  on( pin ) {
    let gpio = this.getPin( pin )
    gpio.off()
  }

  off( pin ) {
    let gpio = this.getPin( pin )
    gpio.off()
  }

}

module.exports = Gpio
