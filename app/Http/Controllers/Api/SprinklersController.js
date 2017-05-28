'use strict'

const Sprinkler = use('App/Model/Sprinkler')
var Gpio = require('chip-gpio')

class SprinklersController {

  * index(request, response) {
    const sprinklers = yield Sprinkler.query().with('schedules').fetch()
    response.json( sprinklers )
  }

  * start(request, response) {
    const id = request.param('id')
    const sprinklers = yield Sprinkler.find(id)

    // var led = new Gpio(sprinklers.pin, 'out');
    // led.write(1)

    response.json( sprinklers )
  }

  * stop(request, response) {

  }

}

module.exports = SprinklersController
