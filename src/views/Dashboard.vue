<template lang="pug">
    b-card.w-100.mt-5( title="Зарегистрировавшиеся участники" )
        b-table#participants.mt-5( striped hover
            :items="items"
            :fields="fields"
            :per-page="pagination.perPage"
            :current-page="pagination.current")

        b-pagination.mt-2( v-model="pagination.current"
            align="center"
            :total-rows="rows"
            :per-page="pagination.perPage"
            aria-controls="participants")
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
                      key: 'name',
                      label: 'ФИО',
                      sortable: true
                  },
                  {
                      key: 'code',
                      label: 'Код скретч-карты',
                      sortable: true
                  },
                  {
                      key: 'phone',
                      label: 'Номер телефона',
                      sortable: true
                  },
                  {
                      key: 'email',
                      label: 'E-mail',
                      sortable: true
                  },
                  {
                      key: 'address',
                      label: 'Адрес',
                      sortable: true
                  },
                  {
                      key: 'game_code',
                      label: 'Игровой номер',
                      sortable: true
                  }
              ]
          }
        },
        beforeMount() {
            this.$http.get('api/v1/auth/participate', {
                headers: {
                    Authorization: `Bearer ${this.$jwt.bearer()}`,
                }
            })
                .then(response => {
                    this.items = [...response.data.participants]
                })
                .catch(error => {
                    this.$handler.handleError(error.response.status)
                })
        },
        computed: {
            rows() {
                return this.items.length
            }
        }
    }
</script>
<style lang="scss">

</style>
