'use strict'

const Env = use('Env')
const Config = use('Config')
const Nuxt = require('nuxt')

class NuxtController {

  constructor () {
      const config = Config.get('nuxt');
      this.nuxt = new Nuxt(config);
      this.nuxt.then((nuxt) => {
        this.nuxt = nuxt;
        if (config.dev) {
          this.nuxt.build();
        }
      });
  }

  * render (request, response) {
    this.nuxt.render(request.request, response.response)
  }
}

module.exports = new NuxtController()