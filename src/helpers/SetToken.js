import axios from "axios"

export function setToken(token) {
    if(token){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
        // axios.defaults.withCredentials = true;
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }
}