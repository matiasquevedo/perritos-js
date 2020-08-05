'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class HostelType extends Model {

	static get visible () {
  		return ['name','description','slug']
	}

  	static boot () {
	    super.boot()

	    this.addTrait('@provider:Lucid/Slugify', {
	      fields: { slug: 'name' },
	      strategy: 'dbIncrement',
	      disableUpdates: false
	    })
  	}

  	hostels () {
  	  return this.belongsTo('App/Models/Hostel','type_id','id')
  	}	

  	
}

module.exports = HostelType
