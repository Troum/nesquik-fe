import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faQuestionCircle, faCheck, faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { ValidationProvider, ValidationObserver} from 'vee-validate';

import BootstrapVue from 'bootstrap-vue';
import HttpService from './services/http.service';
import HandlerService from "./services/handler.service";
import JWT from "./services/jwt-token.service";
import FormService from "./services/form.service";
import PrettyCheckbox from 'pretty-checkbox-vue';
import VueCarousel from 'vue-carousel';
const VueInputMask = require('vue-inputmask').default;

import RegisterComponent from "./components/RegisterComponent";
import NavbarComponent from "./components/NavbarComponent";
import ResultsComponent from "./components/ResultsComponent";
import FaqComponent from "./components/FaqComponent";
import FooterComponent from "./components/FooterComponent";
import MainNavbar from "./components/MainNavbar";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ErrorModal from "./components/ErrorModal";
import SuccessModal from "./components/SuccessModal";
import AddPrizeModal from "./components/AddPrizeModal";
import ConfirmModal from "./components/ConfirmModal";
import SliderComponent from "./components/SliderComponent";
import ResultsModal from "./components/ResultsModal";
import SuccessAlert from "./components/SuccessAlert";

import './scss/app.scss';
import './vee-validate';
import HintModal from "./components/HintModal";


library.add(faQuestionCircle, faCheck, faTimes, faChevronLeft, faChevronRight);

Vue.config.productionTip = false;

Vue.component('register-component', RegisterComponent);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('validation-provider', ValidationProvider);
Vue.component('validation-observer', ValidationObserver);
Vue.component('error-modal', ErrorModal);
Vue.component('success-modal', SuccessModal);
Vue.component('prize-modal', AddPrizeModal);
Vue.component('results-modal', ResultsModal);
Vue.component('confirm-modal', ConfirmModal);
Vue.component('hint-modal', HintModal);
Vue.component('admin-navbar', NavbarComponent);
Vue.component('success-alert', SuccessAlert);
Vue.component('main-navbar', MainNavbar);
Vue.component('results-component', ResultsComponent);
Vue.component( 'faq-component', FaqComponent);
Vue.component('footer-component', FooterComponent);
Vue.component('slider-component', SliderComponent);

Vue.use(BootstrapVue);
Vue.use(HttpService);
Vue.use(PrettyCheckbox);
Vue.use(VueInputMask);
Vue.use(VueCarousel);
Vue.use(HandlerService);
Vue.use(JWT);
Vue.use(FormService);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
