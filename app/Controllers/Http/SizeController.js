'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with sizes
 */

 const Size = use('App/Models/Size')
class SizeController {
  /**
   * Show a list of all sizes.
   * GET sizes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const sizes = await Size.all()
    return view.render('admin.size.index',{
      sizes:sizes.rows
    })
  }

  /**
   * Render a form to be used for creating a new size.
   * GET sizes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('admin.size.create')
  }

  /**
   * Create/save a new size.
   * POST sizes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, session}) {
    const size = await Size.create(request.only(['name']))
    session.flash({ notification: 'Se ha creado un nuevo tamaño '+size.name })
    return response.route('size.index')
  }

  /**
   * Display a single size.
   * GET sizes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    console.log(params.id)
    const size = await Size.findBy('slug',params.id)
    console.log(size)
    return view.render('admin.size.show',{size:size})
  }

  /**
   * Render a form to update an existing size.
   * GET sizes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const size = await Size.findBy('slug',params.id)
    console.log(size)
    return view.render('admin.size.edit',{size:size})
  }

  /**
   * Update size details.
   * PUT or PATCH sizes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, session }) {
    const size = await Size.findBy('slug',params.id)
    console.log(size)
    // size.fill(request.only(['name']))
    // session.flash({ notification: 'Se ha editado el tamaño' })
    // return response.route('size.index')
  }

  /**
   * Delete a size with id.
   * DELETE sizes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response,session }) {
    const size = await Size.findBy('slug',params.id)
    await size.delete()
    session.flash({ notification: 'Se ha eliminado el tamaño' })
    return response.route('size.index')
  }
}

module.exports = SizeController
