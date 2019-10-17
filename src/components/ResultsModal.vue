<template lang="pug">
    b-modal#results-modal( title="Добавленные розыгрыши" size="lg" hide-footer centered)
        b-card.border-0( v-if="items.length > 0" )
            b-table#results-items( hover borderless :items="items" :fields="fields" :per-page="pagination.perPage"
                :current-page="pagination.current" )
                template( v-slot:cell(winners)="row" )
                    p( v-for="(winner, i) in row.item.winners" :key="i") {{ winner.name }}
                template( v-slot:cell(actions)="row" )
                    b-button.float-right.my-auto( pill size="sm" @click="info(row.item)" variant="danger" style="max-width: 1.9rem")
                        font-awesome-icon.text-white( :icon="['fas', 'times']" )
            b-pagination.mt-2( v-model="pagination.current"
                align="center"
                :total-rows="rows"
                :per-page="pagination.perPage"
                aria-controls="participants")
        p.h4.text-center( v-else ) Розыгрыши отсутствуют
</template>

<script>
    export default {
        data() {
            return {
                pagination: {
                    current: 1,
                    perPage: 10
                },
                items: [],
                fields: [
                    {
                        key: 'title',
                        label: 'Дата проведения',
                        sortable: true
                    },
                    {
                        key: 'winners', label: 'Победители'
                    },
                    {
                        key: 'actions', label: 'Удалить'
                    }
                ]
            }
        },
        mounted() {
            this.$root.$on('show-results', () => {
                this.$http.get('api/v1/results')
                    .then(response => {
                        this.items = [...response.data.results];
                    })
                    .catch(error => {
                        this.$handler.handleError(error.response.status)
                    })
            });
            this.$root.$on('refresh', (items) => {
                this.items = [...items];
            })
        },
        computed: {
            rows() {
                return this.items.length
            }
        },
        methods: {
            info(item) {
                this.$bvModal.show('confirm-modal');
                this.$root.$emit('confirm', item);
            }
        }
    }
</script>

<style scoped>

</style>
