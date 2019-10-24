import Api from '@/services/Api'

export default {
    register (credentials) {
        return Api().post('register', credentials);
    },
    getUser (credentials) {
        return Api().get('user/:userHandle');
    }
}

// AuthenticationService.register ({
//     //data
// })
