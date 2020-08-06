'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Hostel extends Model {
	
  	static boot () {
	    super.boot()

	    this.addTrait('@provider:Lucid/Slugify', {
	      fields: { slug: 'name' },
	      strategy: 'dbIncrement',
	      disableUpdates: false
	    })
  	}

  	user () {
    	return this.belongsTo('App/Models/User','user_id','id')
  	}

    type () {
      return this.hasMany('App/Models/HostelType','type_id','id')
    }

    pets () {
      return this.hasMany('App/Models/Pet')
    }		
}

module.exports = Hostel

