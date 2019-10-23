import Api from '@/services/Api'

export default {
    register (credentials) {
        console.log(" in AuthService, creds: ", credentials);
        return Api().post('register', credentials);
    }
}

// AuthenticationService.register ({
//     //data
// })
