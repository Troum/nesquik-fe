<template lang="pug">
    b-modal#confirm-modal( size="md" hide-footer hide-header centered)
        b-row.w-100.m-0.p-0
            b-col.text-center.my-4( cols="12" )
                p.h3 Удалить розыгрыш от {{ title }}?
            b-col.text-center( cols="6" )
                b-button.w-50( variant="danger" @click="deleteResult()") Удалить
            b-col.text-center( cols="6" )
                b-button.w-50( variant="info" @click="$bvModal.hide('confirm-modal')" ) Отменить
</template>

<script>
    export default {
        data() {
            return {
                title: '',
                form: {
                    id: null
                }
            }
        },
        mounted() {
            this.$root.$on('confirm', (item) => {
                this.title = item.title;
                this.form.id = item.id;
            })
        },
        methods: {
            deleteResult() {
                this.$http.post('api/v1/auth/delete', this.$formService.fill(this.form), {
                    headers: {
                        Authorization: `Bearer ${this.$jwt.bearer()}`,
                    }
                })
                    .then(response => {
                        this.$root.$emit('refresh', response.data.results);
                        this.$bvModal.hide('confirm-modal');
                    })
                    .catch(error => {
                        this.$handler.handleError(error.response.status)
                    })
            }
        }
    }
</script>

<style scoped>

</style>
