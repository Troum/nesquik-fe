<template lang="pug">
    b-modal#add-prize( title="Добавить приз " hide-footer centered)
        b-form#prize( @submit.prevent="submit" )
            b-form-group.my-2( label="Наименование приза" )
                b-form-input( type="text" v-model="prize" )
            b-form-group.my-2.text-center
                b-button( variant="info" type="submit" ) Добавить приз
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                array: [],
                index: null,
                prize: ''
            }
        },
        mounted() {
            this.$root.$on('prize', (index, array) => {
                this.$bvModal.show('add-prize');
                this.name = array[index].name;
                this.array = [...array];
                this.index = index;
            })
        },
        methods: {
            submit() {
                this.array[this.index].prize = this.prize;
                this.$root.$emit('update', this.array);
                this.$bvModal.hide('add-prize');
                this.prize = '';
            }
        }
    }
</script>

