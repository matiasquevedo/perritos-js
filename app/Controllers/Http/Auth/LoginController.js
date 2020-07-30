'use strict'

class LoginController {

	showLoginForm({response, view}){
		return response.send(view.render('auth.login'))
	}

	async login ({ auth, request, response, session }) {
	    const { email, password } = request.all()

	    try {
	      console.log(email, password)
	      await auth.attempt(email, password)
	    } catch (e) {
	    	return response.redirect('login')
	    }

	    // return view.render('tasks.index')
	}


}

module.exports = LoginController
