'use strict'

const five = require('johnny-five');
const chipio = require('chip-io');

class Gpio {

  constructor() {
    this.ready = false

    this.pinAddress = [
      'XIO-P0',
      'XIO-P1',
      'XIO-P2',
      'XIO-P3',
      'XIO-P4',
      'XIO-P5',
    ];

    this.pins = []

    this.board = new five.Board({
      io: new chipio(),
    });
    this.board.on('ready', this.handleBoardReady.bind(this))
  }

  //////////////
  // SETTERS  //
  //////////////
  setPinDefault() {

    this.pinAddress.forEach((item) => {
      this.off( item )
    })

  }

  //////////////////
  // Control Pins //
  //////////////////

  getPin( pin ) {
    if ( this.pins[pin] ) return this.pins[pin]

    this.pins[pin] = new five.Led(pin)

    return this.pins[pin]
  }

  on( pin ) {
    let gpio = this.getPin( pin )
    if (this.ready) gpio.off()
  }

  off( pin ) {
    let gpio = this.getPin( pin )
    if (this.ready) gpio.on()
  }

  //////////////
  // HANDLERS //
  //////////////

  handleBoardReady() {
    this.ready = true;

    this.setPinDefault()
  }

}

module.exports = Gpio
