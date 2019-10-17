const JWT = {
    install(Vue) {
        Vue.prototype.$jwt = {
            store: (token) => {
                localStorage.setItem('_token', token)
            },
            remove: () => {
                localStorage.removeItem('_token');
            },
            token: () => {
                return '_token' in localStorage;
            },
            bearer: () => {
                return localStorage.getItem('_token')
            }
        }
    }

};

export default (JWT);
