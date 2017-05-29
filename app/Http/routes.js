'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.group('API', function() {
  Route.get('sprinklers', 'Api/SprinklersController.index')
  Route.get('sprinklers/:id/start', 'Api/SprinklersController.start')
  Route.get('sprinklers/:id/status', 'Api/SprinklersController.status')
  Route.get('sprinklers/:id/stop', 'Api/SprinklersController.stop')
  Route.get('schedules', 'Api/ScheduleController.index')
  Route.get('schedules/test', 'Api/ScheduleController.schedule')
}).prefix('api')

Route.any('*', 'NuxtController.render')
