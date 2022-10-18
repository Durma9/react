class AuthenticationService {
    SuccessfulLogin(username,password) {
        console.log("SuccessfulLogin")
        sessionStorage.setItem('authenticatedUser', username)
    }   

}

export default new AuthenticationService