<template lang="pug">
    b-col.p-0.m-0.mx-auto( cols="12" xl="12" )
        validation-observer( ref="observer" v-slot="{ passes }" )
            b-form#participant.mx-auto( @submit.prevent="passes(submit)" :class="[mobile ? 'w-100' : 'w-75', !needCheck ? 'check' : '']" )
                validation-provider( rules="required" name="Фамилия, имя, отчество" v-slot="{ errors }")
                    b-form-group.my-2
                        b-form-input#name( v-model="form.name" type="text" autocomplete="off" placeholder="Фамилия, имя, отчество" )
                        transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" )
                            div.invalid.text-danger.my-1
                                small {{ errors[0] }}
                validation-provider( rules="required" name="Код скретч-карты" v-slot="{ errors }" )
                    b-form-group.my-2
                        b-input-group
                            b-form-input#code.border-left-none( v-model="form.code" type="text" autocomplete="off" placeholder="Код скретч-карты")
                            b-input-group-append#tooltip-scratch( v-if="needCheck" is-text )
                                font-awesome-icon( @click="$bvModal.show('hint')" :icon="['fas', 'question-circle']" size="2x")
                        transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" )
                            div.invalid.text-danger.my-1
                                small {{ errors[0] }}
                validation-provider( rules="required" name="Номер телефона" v-slot="{ errors }" )
                    b-form-group.my-2
                        b-form-input#phone( v-model="form.phone" type="text" v-mask="{mask: '+375 99 999-99-99', greedy: true}" autocomplete="off" placeholder="Номер телефона")
                        transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" )
                            div.invalid.text-danger.my-1
                                small {{ errors[0] }}
                validation-provider( rules="required|email" name="Адрес электронной почты" v-slot="{ errors }" )
                    b-form-group.my-2
                        b-form-input#email( v-model="form.email" type="email" autocomplete="off" placeholder="Адрес электронной почты")
                        transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" )
                            div.invalid.text-danger.my-1
                                small {{ errors[0] }}
                validation-provider( rules="required" name="Адрес проживания" v-slot="{ errors }" )
                    b-form-group.my-2
                        b-form-input#address( v-model="form.address" autocomplete="off" placeholder="Адрес проживания")
                        transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" )
                            div.invalid.text-danger.my-1
                                small {{ errors[0] }}

                b-form-group.my-2.my-xl-5.text-center( v-if="needCheck" )
                    p-check.pretty.p-image.p-plain.p-smooth.p-bigger.mr-0( v-model="accept")
                        img.image( slot="extra" src="@/assets/images/check.png" )
                        | Я ознакомлен и согласен с&nbsp;
                    router-link( to="/rules" ) правилами рекламной игры
                b-form-group.my-2.my-xl-4.text-center
                    b-button.register( v-if="needCheck" type="submit" size="lg" variant="info" :disabled="!accept") Зарегистрировать
                    b-button( v-else type="submit" size="lg" variant="info" ) Зарегистрировать


</template>

<script>
    export default {
        props: {
          mobile: null,
          needCheck: null
        },
        data() {
            return {
                accept: false,
                form: {
                    name: null,
                    code: null,
                    phone: null,
                    email: null,
                    address: null
                }
            }
        },
        methods: {
            submit() {
                this.$store.commit('loading');
                this.$http.post('api/v1/participate', this.$formService.fill(this.form))
                    .then(response => {
                        this.$bvModal.show('message');
                        this.$root.$emit('success', response.data.code);
                        this.$formService.reset(this.form);
                        this.accept = false;
                        requestAnimationFrame(() => {
                            this.$refs.observer.reset();
                        });
                    })
                    .catch(error => {
                        this.$handler.handleError(error.response.status);
                        this.$root.$emit('error', error.response.data.error);
                    })
                    .finally(() => {
                        this.$store.commit('loading');
                    })
            }
        }
    }
</script>
