<template lang="pug">
    b-row.d-flex.align-items-center.m-0.p-5.footer
        b-col.mx-auto.text-center( cols="12" xl="7" )
            p.footer-small.txt-footer Дополнительную информацию о рекламной игре можно получить по телефону <br>&nbsp;
                a.link( href="tel:375293224252" ) +375 (29) 322-42-52 &nbsp;
                span и по почте&nbsp;
                a.link( href="mailto:info_igra@mail.ru" ) info_igra@mail.ru
                p.footer-small.txt-yel Время работы горячей линии: с 9.00 до 21.00 ПН-ПТ, с 10.00 до 18.00 СБ-ВС.
            p.footer-small.text-justify.txt-footer-s Рекламная игра «Мобильная мама». Срок проведения: с 21 октября 2019 года по 30 декабря 2019 года. ООО «Проспектпресс», УНП 101520868. Свидетельство о государственной регистрации № 3652 от 16.10.2019 года, выданное Министерством антимонопольного регулирования и торговли Республики Беларусь.
</template>

<script>
    export default {
        name: "FooterComponent"
    }
</script>

<style scoped>
.txt-yel {
    color:#fddb00;
    font-size: 1.4em!important;
}
.txt-footer {
    font-size: 1.4em!important;
}
.txt-footer-s {
    font-size: 1.05em!important;
}

</style>
