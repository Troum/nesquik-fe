<template lang="pug">
    b-alert.position-fixed.fixed-top.m-0.rounded-0.text-center( v-model="success" @hide="$store.commit('success', false)"
        style="z-index: 2000;"
        variant="success"
        dismissible) {{ message }}
</template>

<script>
    export default {
        data() {
          return {
              message: null
          }
        },
        mounted() {
          this.$root.$on('success', (message) => {
              this.message = message;
              setTimeout(() => {
                  this.$store.commit('success', false)
              }, 5000);
          })
        },
        computed: {
            success: {
                get() {
                    return this.$store.getters.success
                },
                set() {
                    this.$store.commit('success', false)
                }

            }
        }
    }
</script>
