'use strict'

class LoginController {

	showLoginForm({view}){
		return view.render('auth.login')
	}

	async login ({ auth, request, response, session }) {
		// console.log(request.all())
	    const { email, password } = request.all()

	    try {
	      console.log(email, password)
	      await auth.attempt(email, password)
	      return response.redirect('/')
	    } catch (e) {
	    	return response.redirect('welcome')
	    }

	    // return view.render('tasks.index')
	}

	async loguout ({ auth, request, response, session }){
		await auth.logout()
		return response.redirect('/')
	}


}

module.exports = LoginController
