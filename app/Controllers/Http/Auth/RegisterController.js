'use strict'

const User = use('App/Models/User')

class RegisterController {

	showRegisterForm({view}){
		return view.render('auth.register')
	}

	async register({auth, session, request, response}){
		const data = request.only(['name','lastname','email','password'])

		const user = await User.create(data)


		session.flash({notification: "User created succesfully"})
		await auth.attemp(user.email,user.password)

		return response.redirect('/')

	}
}

module.exports = RegisterController

