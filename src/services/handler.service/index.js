import store from "../../store";
const HandlerService = {
    install(Vue) {
        Vue.prototype.$handler = {
            handleError: (status) => {
                switch (status) {
                    case 401:
                    case 404:
                    case 409:
                    case 500:
                    case 502:
                        store.commit('error', true);
                }
            },
            success: () => {
                store.commit('success', true);
            }
        }
    }
};

export default (HandlerService);
