<template lang="pug">
    div
        admin-navbar
        transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"  mode="out-in")
            router-view
        results-modal
        confirm-modal
</template>

<script>
    export default {

    }
</script>

