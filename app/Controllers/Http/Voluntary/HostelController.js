'use strict'

const Hostel = use('App/Models/Hostel')
const HostelType = use('App/Models/HostelType')
const User = use('App/Models/User')

class HostelController {

	async createHostel({ request, response, view }){
		const types = await HostelType.all()
		return view.render('auth.createHostel',{
		  types:types.rows
		})
	}

	async storeHostel({ request, response, session,auth }){
		console.log(request.all(),request.all().name)
		const hostel = new Hostel()

		hostel.name = request.all().name
		hostel.email = request.all().email
		hostel.description = request.all().description
		hostel.adress = request.all().adress
		hostel.latitude = request.all().latitude
		hostel.longitude = request.all().longitude
		hostel.locality = request.all().locality
		hostel.subAdministrativeArea = request.all().subAdministrativeArea
		hostel.type_id = request.all().type_id
		
		hostel.user_id = auth.user.id

		await hostel.save()

		const user = await User.find(auth.user.id)
		await user.roles().attach(['2'])

		return response.route('home')

	}
}

module.exports = HostelController
