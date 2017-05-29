'use strict'

const Sprinkler = use('App/Model/Sprinkler')
const Gpio = use('Adonis/Src/Gpio')

class SprinklersController {

  * index(request, response) {
    const sprinklers = yield Sprinkler.query().with('schedules').fetch()
    response.json( sprinklers )
  }

  * status(request, response) {
    const id = request.param('id')
    const sprinklers = yield Sprinkler.find(id)

    // Gpio.value(sprinklers.pin);

    response.json( Gpio.status(sprinklers.pin) )
  }

  * start(request, response) {
    const id = request.param('id')
    const sprinklers = yield Sprinkler.find(id)

    Gpio.on(sprinklers.pin);

    response.json( sprinklers )
  }

  * stop(request, response) {
    const id = request.param('id')
    const sprinklers = yield Sprinkler.find(id)

    Gpio.off(sprinklers.pin);

    response.json( sprinklers )
  }

}

module.exports = SprinklersController
