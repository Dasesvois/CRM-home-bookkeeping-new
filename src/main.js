import Vue from "vue";
import { Vuelidate } from "vuelidate";
import App from "./App.vue";
import Paginate from "vuejs-paginate";
import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import localizeFilter from "@/filters/localize.filter";
import tooltipDirective from "@/directives/tooltip.directive";
import massagePlugin from "@/utils/message.plugin";
import titlePlugin from "@/utils/title.plugin";
import vLoader from "@/components/app/vLoader";
import router from "./router";
import store from "./store";
import VueMeta from "vue-meta";
import "materialize-css/dist/js/materialize.min";
import "./registerServiceWorker";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true,
});
Vue.use(massagePlugin);
Vue.use(titlePlugin);
Vue.use(Vuelidate);
Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.filter("localize", localizeFilter);
Vue.directive("tooltip", tooltipDirective);
Vue.component("vLoader", vLoader);
Vue.component("vPaginate", Paginate);

firebase.initializeApp({
  apiKey: "AIzaSyCkuRcfhNHMbYYI8RxGcxhbW14YnWH40m4",
  authDomain: "dayoyaz.firebaseapp.com",
  projectId: "dayoyaz",
  storageBucket: "dayoyaz.appspot.com",
  messagingSenderId: "507330313327",
  appId: "1:507330313327:web:768cca3382e9981d84219a",
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
