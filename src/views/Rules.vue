<template lang="pug">
    div
        pdf.d-flex.justify-content-center( :src="pdfdata" v-for="i in numPages" :key="i" :id="i" :page="i"
            :scale.sync="scale" style="width:100%;margin:20px auto;" )
            template( v-slot:loading )
                | Идёт загрузка...

</template>

<script>
    import pdf from 'pdfvuer'
    export default {
        components: {
            pdf
        },
        data() {
            return {
                numPages: 0,
                page: 1
            }
        },
        mounted () {
            this.getPdf()
        },
        methods: {
            getPdf () {
                let self = this;
                self.pdfdata = pdf.createLoadingTask('./static/example.pdf');
                self.pdfdata.then(pdf => {
                    self.numPages = pdf.numPages;
                });
            }
        }
    }
</script>

<style scoped>

</style>
