<template lang="pug">
    b-row.w-100.mx-auto.my-5
        b-col.mx-auto.p-0.my-5( cols="10" )
            b-row.m-0.p-0
                b-col.d-flex.justify-content-center.mx-auto( cols="10" xl="6" )
                    b-card( title="Добавьте файл со скретч-кодами" )
                        b-row.m-0.p-0
                            b-col.my-3( cols="12" )
                                b-form-file( v-model="file"
                                    :state="Boolean(file)"
                                    @input="addFile"
                                    placeholder="Выберите или перетяните файл"
                                    drop-placeholder="Перетяните файл" )
                            b-col.my-3.text-center( cols="12" )
                                b-button( type="button" @click="submit" variant="info" ) Загрузить
</template>

<script>
    export default {
        data() {
            return {
                file: null,
                form: new FormData
            }
        },
        methods: {
            addFile(file) {
                this.form.append('file', file);
            },
            submit() {
                this.$http.post('api/v1/auth/import', this.form, {
                    headers: {
                        Authorization: `Bearer ${this.$jwt.bearer()}`,
                    }
                })
                    .then(response => {
                        console.log(response.data)
                    })
                    .catch( error => {
                        console.log(error)
                    })
            }
        }
    }
</script>
