<template lang="pug">
    b-modal#error( title="Произошла ошибка" v-model="error" hide-footer @hide="$store.commit('error', false)" centered)
        p.text-danger.text-center.h5 {{ message ? message : 'На сервере произошла ошибка' }}
</template>

<script>
    export default {
        data() {
          return {
              message: null
          }
        },
        mounted() {
          this.$root.$on('error', (message) => {
              this.message = message
          })
        },
        computed: {
            error: {
                get() {
                    return this.$store.getters.error
                },
                set() {
                    this.$store.commit('error', false)
                }

            }
        }
    }
</script>

