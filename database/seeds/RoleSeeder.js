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

const Size = use('App/Models/Size')
const State = use('App/Models/State')
const Sterilization = use('App/Models/Sterilization')
const HostelType = use('App/Models/HostelType')

class RoleSeeder {
  async run () {

    const sizeP = new Size()
    sizeP.name = 'Pequeño'
    sizeP.slug = 'pequeno'
    await sizeP.save()

    const sizeM = new Size()
    sizeM.name = 'Mediano'
    sizeM.slug = 'mediano'
    await sizeM.save()

    const sizeG = new Size()
    sizeG.name = 'Grande'
    sizeG.slug = 'grande'
    await sizeG.save()

    const sizeGM = new Size()
    sizeGM.name = 'Muy Grande'
    sizeGM.slug = 'muy-grande'
    await sizeGM.save()

    const state = new State()
    state.name = 'Publicado'
    state.slug = 'publicado'
    await state.save()

    const stateN = new State()
    stateN.name = 'No Publicado'
    stateN.slug = 'no-publicado'
    await stateN.save()

    const stateA = new State()
    stateA.name = 'Adoptado'
    stateA.slug = 'adoptado'
    await stateA.save()

    const sterilizationS = new Sterilization()
    sterilizationS.name = 'Si'
    sterilizationS.slug = 'si'
    await sterilizationS.save()

    const sterilizationN = new Sterilization()
    sterilizationN.name = 'No'
    sterilizationN.slug = 'no'
    await sterilizationN.save()

    const sterilizationP = new Sterilization()
    sterilizationP.name = 'Promesa'
    sterilizationP.slug = 'promesa'
    await sterilizationP.save()

    const type = new HostelType()
    type.name = 'Casa Particular'
    type.slug = 'casa-particular'
    await type.save()

    const typeA = new HostelType()
    typeA.name = 'Asociación'
    typeA.slug = 'asociacion'
    await typeA.save()

    const typeV = new HostelType()
    typeV.name = 'Veterinaria'
    typeV.slug = 'veterinaria'
    await typeV.save()




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
