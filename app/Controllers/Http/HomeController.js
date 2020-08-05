'use strict'

const Role = use('Adonis/Acl/Role');
const User = use('App/Models/User')

class HomeController {
	async index({auth,view}){
		const user = await User.find(auth.user.id)
		if(await user.getRoles() == 'administrador'){
			console.log('administrador')
			return view.render('admin.index')
		}else if(await user.getRoles() == 'voluntario'){
			console.log('voluntario')
			return view.render('voluntary.index')

		}

	}
}

module.exports = HomeController
