'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with hosteltypes
 */

const HostelType = use('App/Models/HostelType')

class HostelTypeController {
  /**
   * Show a list of all hosteltypes.
   * GET hosteltypes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const types = await HostelType.all()
    // console.log(hostels)
    return view.render('admin.hostel.types.index',{
      types: types.rows
    })
  }

  /**
   * Render a form to be used for creating a new hosteltype.
   * GET hosteltypes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('admin.hostel.types.create')
  }

  /**
   * Create/save a new hosteltype.
   * POST hosteltypes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    // console.log(request.all())
    const type = await HostelType.create(request.only(['name','description']))
    return response.route('types.index')
  }

  /**
   * Display a single hosteltype.
   * GET hosteltypes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing hosteltype.
   * GET hosteltypes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update hosteltype details.
   * PUT or PATCH hosteltypes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a hosteltype with id.
   * DELETE hosteltypes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = HostelTypeController
