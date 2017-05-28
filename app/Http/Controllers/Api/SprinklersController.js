'use strict'

const Sprinkler = use('App/Model/Sprinkler')

class SprinklersController {

  * index(request, response) {
    const sprinklers = yield Sprinkler.query().with('schedules').fetch()
    response.json( sprinklers )
  }

  * start(request, response) {
    const id = request.param('id')
    const sprinklers = yield Sprinkler.find(id)

    var led = new global.five.Led(sprinklers.pin);
    led.off()

    response.json( sprinklers )
  }

  * stop(request, response) {
    const id = request.param('id')
    const sprinklers = yield Sprinkler.find(id)

    var led = new global.five.Led(sprinklers.pin);
    led.on()

    response.json( sprinklers )
  }

}

module.exports = SprinklersController
