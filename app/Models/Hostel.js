'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Hostel extends Model {
	static get hidden () {
	    return []
  	}

  	static get visible () {
    	return ['name','email','description','slug','adress','latitude','longitude','locality','subAdministrativeArea']
  	}

  	static boot () {
	    super.boot()

	    this.addTrait('@provider:Lucid/Slugify', {
	      fields: { slug: 'name' },
	      strategy: 'dbIncrement',
	      disableUpdates: false
	    })
  	}

  	user () {
    	return this.belongsTo('App/Models/User')
  	}

    Type () {
      return this.hasMany('App/Models/HostelType')
    }		
}

module.exports = Hostel

