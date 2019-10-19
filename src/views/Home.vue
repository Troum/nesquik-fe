<template lang="pug">
    div.w-100
        b-row.m-0.p-0.p-xl-1
            b-col.mx-auto.text-center.p-0.pt-5.p-xl-0.mt-5.my-xl-auto( cols="12" xl="11" )
                img.img-fluid.mt-5.my-xl-0( v-if="!mobile" src="@/assets/images/gift.png" )
                img.img-fluid.mt-5.my-xl-0( v-else src="@/assets/images/gift-mobile.png" )
            b-col.mx-auto.p-0.upper.mb-3.rules-cards( cols="10" xl="11" )
                b-row.m-0
                    b-col.mx-auto.text-center( xl="12" )
                        p.h3.conditions.text-uppercase.color Условия игры
                        p.h4.color.date 21.10 - 08.12
                    b-col.mx-auto.p-0.text-center( cols="11" xl="3" v-for="(image, i) in images" :key="i")
                        img.img-fluid( :src="image" )
                    b-col.mx-auto.text-center.my-3( xl="12" )
                        //- router-link.color.rules.h4( to="/rules" ) Правила игры
                        b-link.color.rules.h4( href="/rules/rules-game.pdf" target="_blank") Правила игры
                    b-col.p-0.mx-auto.text-center( cols="10" xl="12" )
                        img.img-fluid( :src="mobile ? './images/highmesure-mobile.png' : './images/highmesure.png'" )
                    b-col.mx-auto.p-0.text-center( cols="10" xl="12" )
                        p.heading
                            span.color.prize.text-uppercase Призы
                    slider-component( :mobile="mobile" )
                    b-col.mx-auto.p-0.text-center( cols="10" xl="12" )
                        p.heading
                            span.color.prize.text-uppercase Зарегистрировать код
                    register-component( :mobile="mobile" :needCheck="true")
                    results-component
                    b-col.mx-auto.p-0.text-center( cols="10" xl="12" )
                        p.heading
                            span.color.prize.text-uppercase Вопросы и ответы
                    faq-component

</template>

<script>
    import { isMobile } from 'mobile-device-detect';
    export default {
        data() {
            return {
                mobile: isMobile,
                images: [
                    './images/1.png',
                    './images/2.png',
                    './images/3.png',
                    './images/4.png',
                ]
            }
        }
    }
</script>

<style scoped>
.rules-cards {
    margin-top: -12em;
}
</style>
