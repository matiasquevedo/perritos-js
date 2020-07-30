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
}

module.exports = Hostel

