<template lang="pug">
    b-modal#hint( hide-footer centered)
        template( v-slot:modal-header )
            b-row.w-100.m-0.p-0.text-white( style="display: inline-flex; align-items: center" )
                b-col( cols="10" )
                    p.h4.text-white Скретч-карта
                b-col.text-right( cols="2" )
                    font-awesome-icon( :icon="['fas', 'times']" @click="$bvModal.hide('hint')")
        b-row.p-0
            b-col.mx-auto.p-0.text-center( cols="11" )
                img.img-fluid( src="@/assets/images/scratch.png" )
</template>

<script>
    export default {
        name: "HintModal"
    }
</script>

<style scoped>

</style>
