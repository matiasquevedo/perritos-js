'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pets
 */
 // hostel
 // variety
 // state
 // size
 // sterilization


const Pet = use('App/Models/Pet')
const Variety = use('App/Models/Variety')
const Hostel = use('App/Models/Hostel')
const State = use('App/Models/State')
const Size = use('App/Models/Size')
const Sterilization = use('App/Models/Sterilization')
const sharp = require('sharp');

const Helpers = use('Helpers');

class PetController {
  /**
   * Show a list of all pets.
   * GET pets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const pets = await Pet.all()
    return view.render('admin.pet.index',{pets:pets.rows})
  }

  /**
   * Render a form to be used for creating a new pet.
   * GET pets/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    const varieties = await Variety.all()
    const hostels = await Hostel.all()
    const states = await State.all()
    const sizes = await Size.all()
    const sterilizations = await Sterilization.all()

    return view.render('admin.pet.create',{
      varieties:varieties.rows,
      hostels:hostels.rows,
      states:states.rows,
      sizes:sizes.rows,
      sterilizations:sterilizations.rows
    })
  }

  /**
   * Create/save a new pet.
   * POST pets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    console.log(request.all(), request.file('image'))

    const validationOptions = {
        types: ['image'],
        size: '1mb',
    };

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
    pet.hostel_id = request.all().hostel_id
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
    return response.route('pet.index')
  }

  /**
   * Display a single pet.
   * GET pets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
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
    const pet = await Pet.findBy('slug',params.id)
    // file.delete(pet.image)
    await pet.delete()
    session.flash({ notification: 'Se ha eliminado la mascota '+pet.name })
    return response.route('pet.index')
  }
}

module.exports = PetController
