import axios from 'axios';
const HttpService = {
    install(Vue) {
        Vue.prototype.$http = axios.create({
            baseURL: `${process.env.VUE_APP_API_URL}`,
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'X-Requested-With' : 'XMLHttpRequest'
            },
            withCredentials: false,
            crossDomain: true
        })
    }
};

export default (HttpService);
