import Vue from 'vue'
const states = {
  token : ''
}
const getters = {
  getToken:(state) => state.token
}
const actions = {
  signIn(){
    let provider = new Vue.prototype.$firebase.auth.FacebookAuthProvider()
    provider.addScope('public_profile')
    provider.addScope('publish_actions')
    provider.setCustomParameters({
      'display': 'popup'
    })
    return Vue.prototype.$firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken
        var user = result.user
        return Vue.prototype.$firebase.database().ref('fb/'+user.uid).set({
          token: token
        })
    }).catch(function (error) {
        console.log(error)
    })
  },
  signOut({state}){
    let user = Vue.prototype.$firebase.auth().currentUser
    if (user) {
      Vue.prototype.$firebase.database().ref('fb/'+user.uid).set({
        token: ''
      })
      state.token = ""
      return Vue.prototype.$firebase.auth().signOut()
    }
  },
  setToken({state}){
    let user = Vue.prototype.$firebase.auth().currentUser
    if (user) {
      Vue.prototype.$firebase.database().ref('fb/'+user.uid).once('value').then(function(snapshot){
        state.token = snapshot.val().token
      })
    }
  }
}
const mutations = {
}

export default {
  getters,
  states,
  actions,
  mutations
}
