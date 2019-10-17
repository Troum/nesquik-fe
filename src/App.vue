<template lang="pug">
    div#app
        b-container.min-vh-100.m-0.p-0( fluid :class="$route.name === 'main' ? 'bg_scratch' : ''" )
            main-navbar( v-if="$route.name === 'main'" :mobile="mobile")
            b-row.min-vh-100.d-flex.align-items-center.m-0.p-0
                b-col.mx-auto.p-0.p-xl-3( cols="12" :xl="$route.name !== 'admin' && $route.name !== 'admin.export' && $route.name !== 'admin.results' ? 11 : 10" )
                    transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"  mode="out-in")
                        router-view
            footer-component( v-if="$route.name === 'main' || $route.name === 'rules'" )
            error-modal
            success-modal
            transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"  mode="out-in")
                success-alert
            hint-modal
        loading(
        overlay-class="loading-overlay"
        loader-class="loading-wrapper"
        label="Подождите..."
        :show="$store.getters.loading" )
            template( v-slot:loading-spinner )
                div.spinner
                    div.cube1
                    div.cube2



</template>
<script>
    import loading from 'vue-full-loading';
    import { isMobile } from 'mobile-device-detect';
    export default {
        data() {
          return {
              mobile: isMobile
          }
        },
        components: {
            loading
        }
    }
</script>
