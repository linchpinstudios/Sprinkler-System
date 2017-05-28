'use strict'

/*
|--------------------------------------------------------------------------
| Http Server
|--------------------------------------------------------------------------
|
| Here we boot the HTTP Server by calling the exported method. A callback
| function is optionally passed which is executed, once the HTTP server
| is running.
|
*/

global.five = require('johnny-five');
var chipio = require('../index'); // or require('chip-io');

var board = new five.Board({
  io: new chipio()
});

const http = require('./bootstrap/http')
http(function () {
  use('Event').fire('Http.start')

  // Start nuxt.js build as soon as possible
  use('App/Http/Controllers/NuxtController')
})
