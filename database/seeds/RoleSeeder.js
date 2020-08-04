'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')
const Role = use('Role')
const User = use('App/Models/User')

class RoleSeeder {
  async run () {
  	const roleAdmin = new Role()
  	roleAdmin.name = 'Administrador'
  	roleAdmin.slug = 'administrador'
  	roleAdmin.description = 'manage administration privileges'
  	await roleAdmin.save()
  	

  	const roleVoluntario = new Role()
  	roleVoluntario.name = 'Voluntario'
  	roleVoluntario.slug = 'voluntario'
  	roleVoluntario.description = 'manage moderator privileges'
  	await roleVoluntario.save()

  	const user = await User.first()
  	await user.roles().attach([roleAdmin.id])

  	console.log(roleAdmin, roleVoluntario)
  }
}

module.exports = RoleSeeder
