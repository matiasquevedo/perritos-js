'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with sterilizations
 */

const Sterilization = use('App/Models/Sterilization')

class SterilizationController {
  /**
   * Show a list of all sterilizations.
   * GET sterilizations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const sterilizations = await Sterilization.all()
    return view.render('admin.sterilization.index',{sterilizations:sterilizations.rows})
  }

  /**
   * Render a form to be used for creating a new sterilization.
   * GET sterilizations/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('admin.sterilization.create')
  }

  /**
   * Create/save a new sterilization.
   * POST sterilizations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, session }) {
    const sterilization = await Sterilization.create(request.only(['name']))
    session.flash({ notification: 'Se ha creado un nuevo estado de Esterilización' })
    return response.route('sterilization.index')
  }

  /**
   * Display a single sterilization.
   * GET sterilizations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    console.log(params.id)
    const sterilization = await Sterilization.findBy('slug',params.id)
    console.log(sterilization)
    return view.render('admin.sterilization.show',{sterilization:sterilization})
  }

  /**
   * Render a form to update an existing sterilization.
   * GET sterilizations/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const sterilization = await Sterilization.findBy('slug',params.id)
    console.log(sterilization)
    return view.render('admin.sterilization.edit',{sterilization:sterilization})
  }

  /**
   * Update sterilization details.
   * PUT or PATCH sterilizations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a sterilization with id.
   * DELETE sterilizations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, session }) {
    const sterilization = await Sterilization.findBy('slug',params.id)
    await sterilization.delete()
    session.flash({ notification: 'Se ha eliminado el estado de Esterilización' })
    return response.route('sterilization.index')
  }
}

module.exports = SterilizationController
