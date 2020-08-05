'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with hostels
 */

const Hostel = use('App/Models/Hostel')
const HostelType = use('App/Models/HostelType')
const User = use('App/Models/User')

class HostelController {
  /**
   * Show a list of all hostels.
   * GET hostels
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const hostels = await Hostel.query()
            .with('type')
            .with('user')
            .fetch()
    // console.log(hostels)
    return view.render('admin.hostel.index',{
      hostels: hostels.toJSON()
    })
  }

  /**
   * Render a form to be used for creating a new hostel.
   * GET hostels/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    const types = await HostelType.all()
    const users = await User.all()
    return view.render('admin.hostel.create',{
      types:types.rows,
      users:users.rows
    })
  }

  /**
   * Create/save a new hostel.
   * POST hostels
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, session }) {
    console.log(request.all())
    const type = await Hostel.create(request.only(['name','email','type_id','user_id','description','locality','subAdministrativeArea','latitude','longitude','adress']))
    session.flash({ notification: 'Se ha creado el refugio con exito' })
    return response.route('hostel.index')
  }

  
  /**
   * Display a single hostel.
   * GET hostels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing hostel.
   * GET hostels/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update hostel details.
   * PUT or PATCH hostels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a hostel with id.
   * DELETE hostels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = HostelController
