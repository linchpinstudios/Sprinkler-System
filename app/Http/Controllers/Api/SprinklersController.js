'use strict'

const Sprinkler = use('App/Model/Sprinkler')

class SprinklersController {

  * index(request, response) {
    const sprinklers = yield Sprinkler.query().with('schedules').fetch()
    response.json( sprinklers )
  }

}

module.exports = SprinklersController
