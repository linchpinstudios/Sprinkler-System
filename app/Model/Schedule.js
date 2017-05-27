'use strict'

const Lucid = use('Lucid')

class Schedule extends Lucid {

  sprinklers() {
    return this.belongsToMany('App/Model/Sprinkler').withPivot('duration')
  }

}

module.exports = Schedule
