'use strict'

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
      'XIO-P6',
    ];

    this.handleBoardReady()
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

    this.pins[pin] = pin

    return this.pins[pin]
  }

  on( pin ) {
    console.log('GPIO ON', pin)
  }

  off( pin ) {
    console.log('GPIO OFF', pin)
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
