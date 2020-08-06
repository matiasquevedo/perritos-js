'use strict'

const Pet = use('App/Models/Pet')
const Variety = use('App/Models/Variety')
const Hostel = use('App/Models/Hostel')
const State = use('App/Models/State')
const Size = use('App/Models/Size')
const User = use('App/Models/User')
const Sterilization = use('App/Models/Sterilization')
const sharp = require('sharp');
const Helpers = use('Helpers');

class PetController {

	async index ({ request, response, view, auth }) {
	const user = await User.find(auth.user.id)
	const hostel = await user.hostel().fetch()
	// console.log()
	  const pets = await Pet.query()
	  	  .with('state')
	  	  .with('sterilization')
		  .where('hostel_id', '=', hostel.id)
		  .fetch()

	  return view.render('voluntary.pet.index',{
	  	pets:pets.toJSON(),
	  	hostel:hostel
	  })
	}

	async create ({ request, response, view, auth }) {
	  const varieties = await Variety.all()
	  const hostels = await Hostel.all()
	  const states = await State.all()
	  const sizes = await Size.all()
	  const sterilizations = await Sterilization.all()
	  const user = await User.find(auth.user.id)
	  const hostel = await user.hostel().fetch()

	  return view.render('voluntary.pet.create',{
	    varieties:varieties.rows,
	    hostels:hostels.rows,
	    states:states.rows,
	    sizes:sizes.rows,
	    sterilizations:sterilizations.rows,
	    hostel:hostel
	  })
	}

	async store ({ request, response, auth }) {
	  console.log(request.all(), request.file('image'))
	  

	  const validationOptions = {
	      types: ['image'],
	      size: '1mb',
	  };

	  const user = await User.find(auth.user.id)
	  const hostel = await user.hostel().fetch()

	  const pet = new Pet()
	  pet.name = request.all().name
	  pet.age = request.all().age
	  pet.gender = request.all().gender
	  pet.adress = request.all().adress
	  pet.latitude = request.all().latitude
	  pet.longitude = request.all().longitude
	  pet.locality = request.all().locality
	  pet.subAdministrativeArea = request.all().subAdministrativeArea
	  pet.description = request.all().description
	  pet.hostel_id = hostel.id
	  pet.variety_id = request.all().variety_id
	  pet.state_id = request.all().state_id
	  pet.size_id = request.all().size_id
	  pet.sterilization_id = request.all().sterilization_id

	  await pet.save()

	  const imageFile = request.file('image', validationOptions);




	  const imageName = pet.slug +'-'+ pet.created_at+'.'+imageFile.subtype

	  


	  // console.log(imageName)

	  

	  await imageFile.move(Helpers.publicPath('images/pets'), {
	      name: imageName,
	      overwrite: true,
	  });

	  // const imageThumb = sharp(imageFile.tmpPath)
	  // console.log(imageThumb)
	  // return imageThumb.format

	  // let transform = sharp()
	  // request.multipart.file('image', {}, async file => {
	  //   const data = await transform
	  //     .resize({ width: 200 })
	  //     .jpeg({
	  //       quality: 100,
	  //       chromaSubsampling: '4:4:4'
	  //     })
	  //     .toFormat(imageFile.subtype)
	  //   file.stream.pipe(transform).pipe(file.stream)

	  //   await Drive.disk('local').put(file.clientName, data, {
	  //     ACL: 'public-read',
	  //     ContentType: 'image/jpeg'
	  //   })
	  // })

	  // await request.multipart.process()





	  // await imageFile.move(Helpers.tmpPath('uploads/thumb'), {
	  //     name: imageName,
	  //     overwrite: true,
	  // });

	  // if (!imageFile.moved()) {
	  //     return imageFile.error();
	  // }


	  pet.image = 'images/pets/'+imageName
	  pet.thumb = 'images/pets/thumb'+imageName
	  await pet.save()
	  // return 'File uploaded';
	  return response.route('voluntary/pet.index')
	}

	async show ({ params, request, response, view }) {
	}

	/**
	 * Render a form to update an existing pet.
	 * GET pets/:id/edit
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async edit ({ params, request, response, view }) {
	}

	/**
	 * Update pet details.
	 * PUT or PATCH pets/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async update ({ params, request, response }) {
	}

	/**
	 * Delete a pet with id.
	 * DELETE pets/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async destroy ({ params, request, response, session }) {
		console.log(params.id)
	  const pet = await Pet.findBy('slug',params.id)
	  await pet.delete()
	  session.flash({ notification: 'Se ha eliminado la mascota '+pet.name })
	  return response.route('voluntary/pet.index')
	}


}

module.exports = PetController
