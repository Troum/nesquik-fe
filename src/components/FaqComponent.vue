<template lang="pug">
    b-col.mx-auto.text-white.my-3.p-0.p-xl-3.faq-comp( cols="11" xl="9" )
        b-card.p-0.border-0.bg-transparent.my-3( no-body v-for="(question, i) in faq" :key="i" )
            b-card-header.border-0.bg-transparent( header-tag="header" class="p-0" role="tab" )
                b-button.faq( block @click="$root.$emit('bv::toggle::collapse', `answer_${i}`)" ) {{ question.title }}
            b-collapse.faq( :id="`answer_${i}`" accordion="answer_accordion" role="tabpanel")
                b-card-body( v-html ="question.answer" :class="i === 1 ? 'd-flex justify-content-center' : ''" )

</template>

<script>
    import faq from '@/static/faq.json';
    export default {
        data(){
            return {
                faq: faq.faq
            }
        }
    }
</script>

<style scoped>
button {
  text-transform: none;
  font-size: 1.5rem!important;
  line-height: 1.4!important;
  }
.faq-comp {
      margin-top: -2em!important;
  }
.faq {
    font-size: 1.2rem;
    line-height: 1;
}

</style>
