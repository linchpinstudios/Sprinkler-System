'use strict'

const Factory = use('Factory')
const Sprinkler = use('App/Model/Sprinkler')
const Database = use('Database')

class SprinklersSeeder {

  * run () {
    yield Database.truncate('sprinklers')
    let sprinklers = [];
    for(let i = 0; i < 6; i++) {
      sprinklers.push({
        name: `Bank ${i + 1}`,
        pin: 'XIO-P${i}`
      })
    }
    yield Sprinkler.createMany(sprinklers)
  }

}

module.exports = SprinklersSeeder
