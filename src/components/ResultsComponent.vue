<template lang="pug">
    b-col.d-flex.my-5.mx-auto.p-2.p-xl-5.justify-content-center.results( cols="12" xl="11" v-if="results.length > 0")
        b-row
            b-col.text-center( cols="12" )
                p.h2.text-uppercase.text-white.font-weight-bold.result-title Розыгрыши и победители
            b-col.text-white( cols="12" )
                b-tabs( pills align="center" )
                    b-tab.my-4( v-for="(result, i) in results" :key="i" :title="result.title")
                        b-row.winner.p-0.m-0( v-for="(winner, k) in result.winners" :key="k")
                            b-col.mx-auto.text-center.p-2( cols="10" xl="6" )
                                span.winner-name {{ winner.name }}
                            b-col.mx-auto.text-center.p-2( cols="10" xl="6" )
                                span.prize-color {{ winner.prize }}

</template>

<script>
    export default {
        data() {
            return {
                results: []
            }
        },
        beforeMount() {
            this.$http.get('api/v1/results')
                .then(response => {
                    this.results = [...response.data.results];
                })
                .catch(error => {
                    this.$handler.handleError(error.response.status)
                })
        }
    }
</script>

<style scoped>

</style>
