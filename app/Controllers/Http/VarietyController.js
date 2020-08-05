'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with varieties
 */

const Variety = use('App/Models/Variety') 
const Category = use('App/Models/Category')

class VarietyController {
  /**
   * Show a list of all varieties.
   * GET varieties
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const varieties = await Variety.all()
    return view.render('admin.variety.index',{varieties:varieties.rows})
  }

  /**
   * Render a form to be used for creating a new variety.
   * GET varieties/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view, session }) {
    const categories = await Category.all()
    console.log(categories)
    if(categories){
      return view.render('admin.variety.create',{
        categories:categories.rows
      })
    }else{
      session.flash({ notification: 'No hay categorias '})
      return response.route('variety.index')
    }
    
  }

  /**
   * Create/save a new variety.
   * POST varieties
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, session }) {
    const variety = await Variety.create(request.only(['name','category_id']))
    session.flash({ notification: 'Se ha creado la categoria '+variety.name })
    return response.route('variety.index')
  }

  /**
   * Display a single variety.
   * GET varieties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    console.log(params.id)
    const variety = await Variety.findBy('slug',params.id)
    console.log(variety)
    return view.render('admin.variety.show',{variety:variety})
  }

  /**
   * Render a form to update an existing variety.
   * GET varieties/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const categories = await Category.all()
    const variety = await Variety.findBy('slug',params.id)
    console.log(categories)
    if(categories){
      return view.render('admin.variety.edit',{
        categories:categories.rows,
        variety:variety
      })
    }else{
      session.flash({ notification: 'No hay categorias '})
      return response.route('variety.index')
    }
  }

  /**
   * Update variety details.
   * PUT or PATCH varieties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a variety with id.
   * DELETE varieties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, session }) {
    const variety = await Variety.findBy('slug',params.id)
    await variety.delete()
    session.flash({ notification: 'Se ha eliminado la variedad '+variety.name })
    return response.route('variety.index')
  }
}

module.exports = VarietyController
