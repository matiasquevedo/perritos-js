'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class State extends Model {

  	static boot () {
	    super.boot()

	    this.addTrait('@provider:Lucid/Slugify', {
	      fields: { slug: 'name' },
	      strategy: 'dbIncrement',
	      disableUpdates: false
	    })
  	}

  	pets () {
  	  return this.hasMany('App/Models/Pet')
  	}	
}

module.exports = State
