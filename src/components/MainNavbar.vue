<template lang="pug">
    b-navbar.bg-transparent.w-100.position-absolute( style="top: 0" )
        b-row.w-100.m-0.p-0
            b-col.mx-auto.text-center.text-xl-left( cols="10" xl="6" style="z-index: 1000")
                b-navbar-brand.p-xl-5(
                    href="https://buslik.by/catalog/pitanie_i_kormlenie/soki_i_napitki/kakao/" )
                    img.img-fluid( v-if="!mobile" src="@/assets/images/ns-logo.png" )
                    img.img-fluid( v-else src="@/assets/images/ns-logo-mobile.png" )
            b-col.mx-auto.text-center.text-xl-right( cols="10" xl="6" style="z-index: 1000")
                b-navbar-brand.p-xl-5.ml-auto(
                    href="https://buslik.by/" )
                    img.img-fluid( v-if="!mobile" src="@/assets/images/stork.png" )
                    img.img-fluid( v-else src="@/assets/images/stork-mobile.png" )

</template>

<script>
    export default {
        props: {
            mobile: null
        }
    }
</script>
