<template lang="pug">
    b-row.w-100.mx-auto.my-5
        b-col.mx-auto.p-0.my-5( cols="10" )
            b-row.m-0.p-0
                b-col.d-flex.justify-content-center.mx-auto( cols="10" xl="6" )
                    b-card.w-100#export.border-0.shadow-sm.bg-light
                        validation-observer( ref="observer" v-slot="{ passes }" )
                            b-form#export-form( @submit.prevent="passes(submit)" )
                                validation-provider( rules="required" name="С даты" v-slot="{ errors }")
                                    b-form-group.ml-4.my-3( label="Добавьте дату и время начала регистрации" )
                                        datepicker.w-100( format="YYYY-MM-DD HH:mm:ss"
                                            valueType="format"
                                            type="datetime"
                                            v-model="form.from" class="date" lang="ru" )
                                        transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" )
                                            div.invalid.text-danger.my-1( v-if="errors[0]" )
                                                small
                                                    small {{ errors[0] }}
                                validation-provider( rules="required" name="По дату" v-slot="{ errors }")
                                    b-form-group.ml-4.my-3( label="Добавьте дату и время конца регистрации" )
                                        datepicker.w-100( format="YYYY-MM-DD HH:mm:ss"
                                            valueType="format"
                                            type="datetime"
                                            v-model="form.to" class="date" lang="ru" )
                                        transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" )
                                            div.invalid.text-danger.my-1( v-if="errors[0]" )
                                                small
                                                    small {{ errors[0] }}
                                b-form-group.ml-4.my-3.text-center
                                    b-button( type="submit" variant="info" ) Сформировать
                b-col.text-center.mx-auto( cols="10" xl="6" )
                    p.d-block.my-5 Для того, чтобы получить выгрузку, выберите дату, с которой необходимо произвести выборку, и дату
                        |  по которую необходимо сделать выборку.
                    transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" )
                        b-button( variant="success" @click="download = false" :href="`${url}/v1/auth/download`" type="button" v-if="download" ) Выгрузить
</template>

<script>
    import Datepicker from 'vue2-datepicker';
    import languages from 'vue2-datepicker/src/locale/languages';
    export default {
        components: {
          Datepicker
        },
        data() {
            return {
                form: {
                    from: '',
                    to: '',
                },
                lang: languages,
                download: false,
                url: process.env.NODE_ENV === 'production' ? `${process.env.VUE_APP_API_URL}/api` : `${process.env.VUE_APP_API_URL}`
            }
        },
        methods: {
            submit() {
                this.$http.post('api/v1/auth/export', this.$formService.fill(this.form), {
                    headers: {
                        Authorization: `Bearer ${this.$jwt.bearer()}`,
                    }
                })
                    .then(response => {
                        this.download = response.data.export;
                        requestAnimationFrame(() => {
                            this.$refs.observer.reset();
                        });
                        this.$formService.reset(this.form);
                    })
                    .catch(error => {
                        this.$handler.handleError(error.response.status);
                    })
            }
        }
    }
</script>

<style scoped>

</style>
