import Vue from 'vue'
import App from './App'
import vueResource from 'vue-resource'
import '../node_modules/bulma/css/bulma.css'
import vuex from '@/vuex'
import firebase from '@/firebase'
import config from '@/firebase/config'
Vue.config.productionTip = false
Vue.use(firebase)
Vue.use(vueResource)
Vue.http.options.crossOrigin = true
Vue.http.options.xhr = {withCredentials: true}
vuex.dispatch('getJSON',"https://ywc15.ywc.in.th/api/interview")
Vue.prototype.$firebase.initializeApp(config)

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  http: {
            emulateJSON: true,
            emulateHTTP: true,
            headers: {
      'Content-Type': 'application/json'
    }
  }
})
