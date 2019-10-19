<template lang="pug">
    b-row.w-100.mx-auto.my-5
        b-col.mx-auto.p-0.my-5( cols="10" )
            b-card#info.border-0.shadow-sm.bg-light
                template( v-slot:header )
                    h4.text-center Добавить розыгрыш
                b-row.m-0.p-0.w-100
                    b-col( cols="6" )
                        validation-observer( ref="observer" v-slot="{ passes }" )
                            b-form#results-form.w-75( @submit.prevent="passes(submit)" )
                                validation-provider( rules="required" name="Дата розыгрыша" v-slot="{ errors }")
                                    b-form-group.ml-4.my-3( label="Добавьте дату розыгрыша" )
                                        datepicker( :format="'DD.MM.YYYY'"
                                            valueType="format"
                                            v-model="form.resultDate" class="date" lang="ru" )
                                        transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" )
                                            div.invalid.text-danger.my-1
                                                small
                                                    small {{ errors[0] }}
                                    b-form-group.ml-4.my-3
                                        b-button( type="submit" variant="info" ) Добавить
                    b-col.shadow.rounded-sm.bg-info.text-white.p-3( cols="6" )
                        h6 Инструкция
                        ol
                            li Добавьте дату розыгрыша
                            li Добавьте победителей розыгрыша
                            li Добавьте победителю его приз
                            li Нажмите кнопку "Добавить"
                            li Дождитесь ответа, что розыгрыш успешно сохранён
                            li Попейте кофе или чаю и отдохните от проделанной работы
                p.text-center.my-3
                    small Для того, чтобы добавить победителя розыгрыша - перетяните его из поля "Участники" на серое поле "Победители", пока оно не отобразится в нём.
                    br
                    small Если вы хотите убрать участника из списка победителей - просто перетяниете его обратно в поле "Участники".
                    br
                    small Чтобы добавить победителю приз - нажмите на добавленного победителя и введите наименование приза в модальном окне и нажмите кнопку "Добавить" в модальном окне.
                div.text-center
                    b-button.mx-auto.w-25( type="button" variant="info" @click="showResults") Показать результаты
        b-col.mx-auto.p-0.my-3( cols="11" )
            b-row#choose.m-0
                b-col.mx-auto.p-0( cols="5" )
                    b-row.m-0
                        b-col.m-0.p-0( cols="12" )
                            h5 Участники
                        b-col.m-0.p-0( cols="12" )
                            b-input-group
                                b-input( type="text" autocomplete="off" @keyup.delete="getParticipants" v-model="name" placeholder="Найти участника")
                                b-input-group-append
                                    b-button.rounded-0.w-100( @click="filterItems" type="button" size="md" variant="success" )
                                        small Найти
                        b-col.text-white.p-0.m-0.mx-auto( cols="12"
                                :class="items.length === 0 ? 'bg-light' : ''"
                                style="max-height: 26.5rem; min-height: 5rem; overflow-y: auto" )
                                draggable( v-model="items" group="participants" )
                                    b-card.border-0.bg-info.shadow-sm.my-1( v-for="element in items" :key="element.id" )
                                        strong Имя:
                                        span &nbsp;{{element.name}}&nbsp;
                                        br
                                        span Игровой код:&nbsp;
                                        b-badge.text-dark( variant="light" ) {{ element.game_code }}
                                        br
                                        span &nbsp;Код скретч-карты:&nbsp;
                                        b-badge.text-dark( variant="light" ) {{ element.code }}
                                        br
                                        span &nbsp;Телефон:&nbsp;
                                        b-badge.text-dark( variant="light" ) {{ element.phone }}
                b-col.mx-auto.p-0( cols="5" )
                    b-row.m-0
                        b-col.m-0.p-0( cols="12" )
                            h5 Победители
                        b-col.text-white.p-0.m-0.mx-auto( cols="12"
                                :class="form.participants.length === 0 ? 'bg-light' : ''"
                                style="max-height: 26.5rem; min-height: 5rem; overflow-y: auto" )
                                draggable( v-model="form.participants" group="participants" :sort="true" )
                                    b-card.border-0.bg-info.shadow-sm.my-1(
                                        v-for="(element, i) in form.participants" :key="element.id"
                                        @click="openAddPrize(i)"  )
                                        strong Имя:
                                        span &nbsp;{{element.name}}&nbsp;
                                        br
                                        span Игровой код:&nbsp;
                                        b-badge.text-dark( variant="light" ) {{ element.game_code }}
                                        br
                                        span &nbsp;Код скретч-карты:&nbsp;
                                        b-badge.text-dark( variant="light" ) {{ element.code }}
                                        br
                                        span &nbsp;Телефон:&nbsp;
                                        b-badge.text-dark( variant="light" ) {{ element.phone }}
                                        br
                                        span( v-if="element.prize" ) &nbsp;Приз:&nbsp;
                                        b-badge.text-dark( variant="light" v-if="element.prize" ) {{ element.prize }}
                        transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" )
                            div.invalid.text-danger.my-1( v-if="!empty" )
                                small В розыгрыше не могут отсутствовать победители
        prize-modal



</template>

<script>
    import draggable from 'vuedraggable';
    import Datepicker from 'vue2-datepicker';
    import languages from 'vue2-datepicker/src/locale/languages';
    export default {
        components: {
            draggable,
            Datepicker
        },
        data() {
            return {
                items: [],
                sorted: [],
                participants: [],
                lang: languages,
                form: {
                    resultDate: '',
                    participants: []
                },
                empty: true,
                name: ''

            }
        },
        beforeMount() {
            this.getParticipants();
        },
        mounted() {
            this.$root.$on('update', (array) => {
                this.form.participants = [];
                this.form.participants = [...array];
            });
        },
        methods: {
            getParticipants() {
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
            submit() {
                if(this.form.participants.length > 0) {
                    this.$http.post('api/v1/auth/result', this.$formService.fill(this.form), {
                        headers: {
                            Authorization: `Bearer ${this.$jwt.bearer()}`,
                        }
                    })
                        .then(response => {
                            this.$root.$emit('success', response.data.success);
                            this.$handler.success();
                            requestAnimationFrame(() => {
                                this.$refs.observer.reset();
                            });
                            this.$formService.reset(this.form);
                            this.empty = true;
                        })
                        .catch(error => {
                            this.$handler.handleError(error.response.status);
                            this.$root.$emit('error', error.response.data.error);
                        })
                } else {
                    this.empty = false;
                }
            },
            openAddPrize(index) {
                this.$root.$emit('prize', index, this.form.participants);
            },
            filterItems(){
                const array = this.items.filter( item => {
                    return item.name.match(this.name) || item.code.match(this.name) || item.game_code.match(this.name);
                });
                this.items = array;
            },
            showResults() {
                this.$bvModal.show('results-modal');
                this.$root.$emit('show-results');
            }
        },
        computed: {
            filtered() {
                return this.items.filter( item => {
                    return item.name.match(this.name);
                })
            }
        }
    }
</script>
<style scoped>

</style>
