'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pet extends Model {
  	static boot () {
	    super.boot()

	    this.addTrait('@provider:Lucid/Slugify', {
	      fields: { slug: 'name' },
	      strategy: 'dbIncrement',
	      disableUpdates: false
	    })
  	}

  	hostel () {
    	return this.belongsTo('App/Models/Hostel')
  	}

  	variety () {
    	return this.belongsTo('App/Models/Variety')
  	}

  	state () {
    	return this.belongsTo('App/Models/State')
  	}

  	size () {
    	return this.belongsTo('App/Models/Size')
  	}

  	sterilization () {
    	return this.belongsTo('App/Models/Sterilization')
  	}
}

module.exports = Pet
