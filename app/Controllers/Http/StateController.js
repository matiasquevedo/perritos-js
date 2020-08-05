'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with states
 */

const State = use('App/Models/State')

class StateController {
  /**
   * Show a list of all states.
   * GET states
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const states = await State.all()
    return view.render('admin.state.index',{states:states.rows})
  }

  /**
   * Render a form to be used for creating a new state.
   * GET states/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('admin.state.create')
  }

  /**
   * Create/save a new state.
   * POST states
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, session }) {
    const state = await State.create(request.only('name'))
    session.flash({notification:'Se ha creado el estado '+state.name})
    return response.route('state.index')

  }

  /**
   * Display a single state.
   * GET states/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const state = await State.findBy('slug',params.id)
    return view.render('admin.state.show',{state:state})
  }

  /**
   * Render a form to update an existing state.
   * GET states/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const state = await State.findBy('slug',params.id)
    return view.render('admin.state.edit',{state:state})
  }

  /**
   * Update state details.
   * PUT or PATCH states/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a state with id.
   * DELETE states/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response,session }) {
    const state = await State.findBy('slug',params.id)
    await state.delete()
    session.flash({notification:'Se ha eliminado el estado '+state.name})
    return response.route('state.index')
  }
}

module.exports = StateController
