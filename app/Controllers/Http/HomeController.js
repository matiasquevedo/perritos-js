'use strict'

const Role = use('Adonis/Acl/Role');
const User = use('App/Models/User')
const Pet = use('App/Models/Pet')
const Hostel = use('App/Models/Hostel')
const Variety = use('App/Models/Variety')

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

		  // return pets

	  return view.render('welcome',{
	  	pets:pets.toJSON()
	  })
	}

	async publicPet({ params, request, response, view }){
		console.log(params.id)
		const pet = await Pet.findBy('slug',params.id)
		const sterilization = await pet.sterilization().fetch()
		const size = await pet.size().fetch()
		const variety = await pet.variety().fetch()
		const hostel = await pet.hostel().fetch()

		const v = await Variety.find(variety.id)
		const category = await v.category().fetch()
		console.log(category)

		return view.render('public.pet.show',{
			pet:pet,
			sterilization:sterilization,
			size:size,
			variety:variety,
			hostel:hostel,
			category:category
		})
	}

	async publicHostel({ params, request, response, view }){
		console.log(params.id)
		const hostel = await Hostel.findBy('slug',params.id)
		  const pets = await Pet.query()
		  	  .with('sterilization')
			  .where('hostel_id', '=', hostel.id)
			  .where('state_id', '=', '1')
			  .fetch()

		return view.render('public.hostel.show',{
			pets:pets.toJSON(),
			hostel:hostel
		})
	}
}

module.exports = HomeController
