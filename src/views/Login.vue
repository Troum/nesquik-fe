<template lang="pug">
    b-col.mx-auto( cols="11" xl="6" )
        validation-observer( ref="observer" v-slot="{ passes }" )
            b-form#login-form.w-100.mx-auto.p-5.bg-light.rounded-sm.shadow( @submit.prevent="passes(submit)" )
                b-form-group.mb-3
                    p.text-center.h4 Вход
                validation-provider( rules="required" name="Ваш логин (e-mail)" v-slot="{ errors }")
                    b-form-group.my-3
                        b-form-input#login( v-model="form.email" type="email" autocomplete="off" placeholder="Логин" )
                        transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" )
                            div.invalid.text-danger.my-1
                                small {{ errors[0] }}
                validation-provider( rules="required" name="Пароль" v-slot="{ errors }" )
                    b-form-group.my-3
                        b-input-group
                            b-form-input#password.border-left-none( v-model="form.password" type="password" placeholder="Пароль")
                        transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" )
                            div.invalid.text-danger.my-1
                                small {{ errors[0] }}
                b-form-group.my-4.text-center
                    b-button(type="submit" size="lg" variant="info" ) Войти
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    email: null,
                    password: null
                }
            }
        },
        methods: {
            submit() {
                this.$http.post('api/v1/auth/login', this.$formService.fill(this.form))
                    .then(response => {
                        this.$store.commit('authenticate', response.headers['authorization']);
                        this.$root.$emit('success', response.data.success);
                        this.$handler.success();
                        this.$router.push({name: 'admin'});
                    })
                    .catch(error => {
                        this.$handler.handleError(error.response.status);
                        this.$root.$emit('error', error.response.data.error);
                    })
            }
        }
    }
</script>

<style scoped>

</style>
