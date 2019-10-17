<template lang="pug">
    b-modal#message( hide-footer centered)
        template( v-slot:modal-header )
            b-row.w-100.m-0.p-0.text-white( style="display: inline-flex; align-items: center" )
                b-col( cols="10" )
                    p.h4.text-white Поздравляем!
                b-col.text-right( cols="2" )
                    font-awesome-icon( :icon="['fas', 'times']" @click="$bvModal.hide('message')")
        p.text-dark.text-center.h5 Вы успешно зарегистрировались! Ваш игровой код:&nbsp;
            strong.text-success {{ message }}
</template>

<script>
    export default {
        data() {
            return {
                message: ''
            }
        },
        mounted() {
            this.$root.$on('success', (message) => {
                this.message = message;
            })
        }
    }
</script>

<style scoped>

</style>
