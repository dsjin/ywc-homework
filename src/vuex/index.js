import Vue from 'vue'
import Vuex from 'vuex'
import Data from './modules/data.js'
import Firebase from './modules/firebase.js'
Vue.use(Vuex)
var data = new Vuex.Store({
  state: {},
  mutations : {},
  getters: {},
  actions: {},
  modules: {
    Data,
    Firebase
  }
})

export default data
