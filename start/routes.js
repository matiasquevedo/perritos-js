'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.on('/agregar-refugio').render('auth/createHostel')

Route.get('login', 'Auth/LoginController.showLoginForm').as('loginForm')
Route.post('login', 'Auth/LoginController.login').as('login')
Route.get('logout', 'Auth/LoginController.loguout').as('logout')
Route.get('register','Auth/RegisterController.showRegisterForm').as('registerFrom')
Route.post('register','Auth/RegisterController.register').as('register')

// Route.resource('hostel', 'HostelController')

Route.get('/home', 'HomeController.index').as('home')


Route.group(() => {
	Route.on('/').render('admin/index')
	Route.resource('hostel','HostelController')
	Route.resource('types','HostelTypeController')
}).prefix('admin').middleware(['auth','is:(administrador)'])


// Route.post('login', 'UserController.login')
// Route.get('logout', 'UserController.logout')



