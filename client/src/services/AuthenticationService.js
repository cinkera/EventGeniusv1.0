import Api from '@/services/Api'

export default {
    register (credentials) {
        console.log("\n ... AuthenticationService.js");
        return Api().post('register', credentials);
    },
    login (credentials) {
        console.log("\n ... signIn function of AuthServices");
        return Api().post('login', credentials)
    },
    logout() {
        console.log("\n ... signOut function of AuthServices");
        return Api().get('logout');
    }
}

// AuthenticationService.register ({
//     //data
// })
