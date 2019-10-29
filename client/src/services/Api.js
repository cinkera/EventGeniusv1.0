import axios from 'axios'

export default () => {
    console.log("\n ... Api.js");
    return axios.create({
        baseURL: `http://localhost:8081/` //backend of the server URL
    })
}
