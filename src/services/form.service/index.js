const FormService = {
    install(Vue) {
        Vue.prototype.$formService = {
            fill: (object) => {
                const fd = new FormData();
                for(let key in object) {
                    if(object.hasOwnProperty(key)) {
                        if(Array.isArray(object[key])) {
                            object[key].forEach(item => {
                                fd.append('array[]', JSON.stringify(item))
                            })
                        } else {
                            fd.append(key, object[key])
                        }

                    }
                }
                return fd;
            },
            reset: (object) => {
                for(let key in object) {
                    if(object.hasOwnProperty(key)) {
                        if(Array.isArray(object[key])) {
                            object[key] = [];
                        } else {
                            object[key] = null;
                        }

                    }
                }
            },
        }
    }
};

export default (FormService);
