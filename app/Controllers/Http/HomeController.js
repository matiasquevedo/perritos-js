'use strict'

const Role = use('Adonis/Acl/Role');
const User = use('App/Models/User')
const Pet = use('App/Models/Pet')

class HomeController {
	async index({auth,view}){
		const user = await User.find(auth.user.id)
		if(await user.getRoles() == 'administrador'){
			console.log('administrador')
			return view.render('admin.index')
		}else if(await user.getRoles() == 'voluntario'){
			console.log(auth.user.hostel())
			const hostel = await user.hostel().fetch()
			return view.render('voluntary.index',{hostel:hostel})

		}

	}

	async welcome({auth,view}){
	  const pets = await Pet.query()
	  	  .with('sterilization')
	  	  .with('size')
	  	  .with('variety')
	  	  .with('hostel')
		  .where('state_id', '=', '1')
		  .fetch()

	  return view.render('welcome',{
	  	pets:pets.toJSON()
	  })
	}
}

module.exports = HomeController
