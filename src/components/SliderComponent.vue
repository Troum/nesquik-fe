<template lang="pug">
    b-col.p-0.m-0( cols="12" )
        b-row.m-0
            b-col.text-center.my-3.mx-auto( cols="11" xl="3" @click="$router.push({name: 'rules'})"  )
                img.img-fluid.rules( src="@/assets/images/prize-1.png" )
            b-col.text-center.my-3.mx-auto( cols="11" xl="3" )
                img.img-fluid( src="@/assets/images/prize-2.png" )
            b-col.text-center.my-3.mx-auto( cols="11" xl="3" )
                img.img-fluid( src="@/assets/images/prize-3.png" )
            b-col.text-center.my-3.mx-auto( cols="11" xl="3" )
                img.img-fluid( src="@/assets/images/prize-4.png" )

</template>

<script>

    export default {
        props: {
            mobile: null
        }
    }
</script>
