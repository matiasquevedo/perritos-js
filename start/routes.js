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
Route.get('agregar-refugio', 'Voluntary/HostelController.createHostel').as('nuevo.refugio').middleware(['auth'])
Route.post('agregar-refugio', 'Voluntary/HostelController.storeHostel').as('store.refugio').middleware(['auth'])


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

	Route.resource('size','SizeController')
	Route.get('size/delete/:id', 'SizeController.destroy').as('size.delete')

	Route.resource('sterilization','SterilizationController')
	Route.get('sterilization/delete/:id', 'SterilizationController.destroy').as('sterilization.delete')

	Route.resource('category','CategoryController')
	Route.get('category/delete/:id', 'CategoryController.destroy').as('category.delete')

	Route.resource('variety','VarietyController')
	Route.get('variety/delete/:id', 'VarietyController.destroy').as('variety.delete')

	Route.resource('state','StateController')
	Route.get('state/delete/:id', 'StateController.destroy').as('state.delete')

}).prefix('admin').middleware(['auth','is:(administrador)'])


// Route.post('login', 'UserController.login')
// Route.get('logout', 'UserController.logout')



